# File to determine recommendations for a user based on their selection of interests

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Function to format the interest bubbles the user selected
def process_recommendations(selections):
    genres = []
    events = []
    courses = []
    traits = []

    # Check if the key exists in selections and then extend the appropriate list
    if 'genres' in selections:
        genres.extend(selections['genres'])
    if 'events' in selections:
        events.extend(selections['events'])
    if 'courses' in selections:
        courses.extend(selections['courses'])
    if 'traits' in selections:
        traits.extend(selections['traits'])

    # Create a variable to hold the selections
    processed_selections = {
        "genres": genres,
        "events": events,
        "courses": courses,
        "traits": traits
    }

    print("Processed Selections:", processed_selections)
    return processed_selections

# Function to determine the top 5 matching universities based on the user's course selections
def recommend_courses(processed_selections, uniCourses_df, top_n=5):
    # Extract course preferences from the processed selections
    course_preferences = processed_selections['courses']

    # Combine all course names into a single string for each university
    uniCourses_df['combined'] = uniCourses_df.groupby('University Name')['Course Name'].transform(lambda x: ' '.join(x))
    # Drop duplicates to ensure we only have one row per university
    uni_courses_combined = uniCourses_df[['University Name', 'combined']].drop_duplicates()

    # Instantiate the vectorizer, converts the text data into a matrix of token counts
    vectorizer = CountVectorizer().fit(uni_courses_combined['combined'])
    course_matrix = vectorizer.transform(uni_courses_combined['combined']) # Vectorize the combined course names
    prefs_vector = vectorizer.transform([' '.join(course_preferences)]) # Vectorize the user's course preferences
    
    # Calculate cosine similarity between course preferences and university course offerings
    cosine_sim = cosine_similarity(prefs_vector, course_matrix) 

    # Get similarity scores for all universities and sort them
    similarity_scores = list(enumerate(cosine_sim[0])) # prefs_vector is a single row matrix
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True) # lambda to specify sortnig on the 2nd element of the tuple i.e. the score

    # Get the top 5 most similar universities
    top_indexes = [i[0] for i in similarity_scores[:top_n]]
    
    # Fetch the top universities as before
    top_universities = uni_courses_combined.iloc[top_indexes]
    top_uni_names = top_universities['University Name'].tolist()

    # Initialize a result dictionary
    result = {}
    
    # For each top university, find specific courses that match the preferences
    for uni in top_uni_names:
        # Filter courses for the current university
        uni_courses = uniCourses_df[uniCourses_df['University Name'] == uni]['Course Name'].tolist()
        
        # Calculate similarity scores for each course
        course_scores = []
        for course in uni_courses:
            # Represent each course and preferences as text for vectorization
            course_text = ' '.join([course])
            prefs_text = ' '.join(course_preferences)
            # Vectorize and calculate cosine similarity
            vectorized_text = vectorizer.transform([course_text, prefs_text])
            score = cosine_similarity(vectorized_text[0], vectorized_text[1])
            course_scores.append((course, score[0][0]))
        
        # Sort courses based on similarity scores
        sorted_courses = sorted(course_scores, key=lambda x: x[1], reverse=True)
        # Select top matching courses
        top_courses = sorted_courses[:top_n]
        
        # Add to result
        result[uni] = [course[0] for course in top_courses]

    return result

'''
# Example usage
processed_selections = ['Art Design']
recommendations = recommend_courses(processed_selections, uniCourses_df)
for uni, courses in recommendations.items():
    print(f"University: {uni}")
    for course in courses:
        print(f"  - {course}")
'''

# Function to determine the top 5 matching cities based on the user's genre selections
def recommend_music(processed_selections, spotifyPlaylist_df):
    # Extract course preferences from the processed selections
    genre_preferences = processed_selections['genres']
    # Filter out genres that do not exist in the DataFrame
    valid_genres = [genre for genre in genre_preferences if genre in spotifyPlaylist_df.columns]
    # Calculate combined score only for valid genres
    spotifyPlaylist_df['combined_score'] = spotifyPlaylist_df[valid_genres].apply(pd.to_numeric, errors='coerce').sum(axis=1)
    
    # Sort the DataFrame by combined score in descending order
    sorted_countries = spotifyPlaylist_df.sort_values(by='combined_score', ascending=False)
    
    # Select the top 5 countries
    top_countries = sorted_countries.head(5)
    
    return top_countries[['Country Code', 'combined_score'] + valid_genres]

'''
# Example usage
genres_preferences = ['EDM', 'Latin/Reggaeton']  # Ensure these genres exist in your DataFrame
top_countries = recommend_countries_by_genres(genres_preferences, spotifyPlaylist_df)
print(top_countries)
'''
# Function to determine the top 5 matching cities for events based on the user's event type selections
def recommend_events(processed_selections, liveEvents_df, top_n=5):
    # Extract genre preferences from the processed selections
    genres_preferences = processed_selections['events']
    # Filter DataFrame for rows where 'Genre' or 'Subgenre' matches the preferences
    filtered_df = liveEvents_df[liveEvents_df['Genre'].isin(genres_preferences) | liveEvents_df['Subgenre'].isin(genres_preferences)]
    
    # Group by 'Country Code' and count the occurrences
    country_counts = filtered_df.groupby('Country Code').size().reset_index(name='Counts').sort_values(by='Counts', ascending=False).head(top_n)
    
    # Initialize top_countries_events dictionary to include all country codes in country_counts with an empty list
    # This ensures that every country code in the top_n has an entry, even if no events are available to sample
    top_countries_events = {row['Country Code']: [] for _, row in country_counts.iterrows()}
    
    # For each top country, get a sample of matching events
    for country_code in top_countries_events.keys():
        # Sample up to 3 events for each country
        num_items = len(filtered_df[filtered_df['Country Code'] == country_code])
        sample_size = min(num_items, 3) 
        if sample_size > 0:  # Ensures there is something to sample
            sample_events = filtered_df[filtered_df['Country Code'] == country_code].sample(sample_size)
            top_countries_events[country_code] = sample_events[['Event Name', 'Genre', 'Subgenre']].to_dict('records')
    
    return country_counts, top_countries_events

'''
genres_preferences = ['Dance/Electronic']
top_countries, matching_events = recommend_countries_by_live_events(genres_preferences, liveEvents_df)
print(top_countries)
for country, events in matching_events.items():
    print(f"Country Code: {country}, Sample Events: {events}")
'''

# Function to determine the top 5 cities based on the user's city traits selections
def recommend_reviews(processed_selections, reviews_df):
    # Extract buzzwords from the processed selections
    buzzwords = processed_selections['traits']
    # Combine all descriptions into a single string for each city
    reviews_df['combined_descriptions'] = reviews_df.groupby('University Name')['Description'].transform(lambda x: ' '.join(x))
    # Drop duplicates to ensure we only have one row per city
    uni_reviews_combined = reviews_df[['University Name', 'combined_descriptions']].drop_duplicates()

    # Instantiate the vectorizer
    vectorizer = TfidfVectorizer(stop_words='english')
    descriptions_matrix = vectorizer.fit_transform(uni_reviews_combined['combined_descriptions']) # Vectorize the combined descriptions
    buzzwords_vector = vectorizer.transform([' '.join(buzzwords)]) # Vectorize the buzzwords
    
    # Compute cosine similarity between buzzwords and city descriptions
    cosine_sim = cosine_similarity(buzzwords_vector, descriptions_matrix)

    # Get similarity scores for all cities and sort them
    similarity_scores = list(enumerate(cosine_sim[0]))
    similarity_scores_sorted = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Get the top 5 most similar cities
    top_indexes = [i[0] for i in similarity_scores_sorted[:5]]
    
    # Fetch the uni names and their scores
    top_unis = uni_reviews_combined.iloc[top_indexes].copy()
    top_unis['Similarity Score'] = [similarity_scores_sorted[i][1] for i in range(5)]


    return top_unis[['University Name', 'Similarity Score']]

'''
# Example usage
buzzwords = ['Lively', 'Fun', 'Bars']
top_unis = recommend_unis_by_buzzwords(buzzwords, reviews_df)
print(top_unis)
'''
# Function to determine what cities get returned to the user
def city_recommender(total_recommendations):
    # Dictionary to map university names to country codes
    uni_to_country_code = {
        'HDA': 'DE',
        'WINDESHEIM': 'NL',
        'OAMK': 'FI',
        'OTH': 'DE',
        'MDU': 'SE',
        'FHNW': 'CH', 
        'UIA': 'NO',
        'FH': 'AT',
        'RIT': 'HR',
        'UNIZA': 'SK',
        'UPC': 'ES',
        'UNILJ': 'SI',
        'UNIPG': 'IT',
    }

    location_counts = {}
    uni_counts = {}
    uni_associations = {}

    # Handle courses
    for uni in total_recommendations['courses']:
        country_code = uni_to_country_code.get(uni, uni)
        location_counts[country_code] = location_counts.get(country_code, 0) + 1
        uni_counts[uni] = uni_counts.get(uni, 0) + 1
        uni_associations.setdefault(country_code, set()).add(uni) # Set means that each university is only added once
        
    # Handle live events
    _, events_dict = total_recommendations['events']
    for country_code in events_dict:
        location_counts[country_code] = location_counts.get(country_code, 0) + len(events_dict[country_code])

    # Handle music
    for _, row in total_recommendations['music'].iterrows():
        country_code = row['Country Code']
        location_counts[country_code] = location_counts.get(country_code, 0) + 1 # Count occurences of each country

    # Handle reviews
    for _, row in total_recommendations['reviews'].iterrows():
        uni_name = row['University Name']
        country_code = uni_to_country_code.get(uni_name, uni_name) # If the uni name is not in the dictionary, use the name itself
        location_counts[country_code] = location_counts.get(country_code, 0) + 1 # Count occurences of each country
        uni_counts[uni_name] = uni_counts.get(uni_name, 0) + 1 # Count occurences of each university
        uni_associations.setdefault(country_code, set()).add(uni_name) 

    # Identify the top 3 locations based on occurrence
    top_locations = sorted(location_counts.items(), key=lambda item: item[1], reverse=True)[:3]

    top_cities = []
    for loc, count in top_locations:
        associated_unis = list(uni_associations.get(loc, []))
        if len(associated_unis) > 1 and loc in uni_to_country_code.values():
            # If multiple universities are associated with this country code, find the most frequently occurring one
            highest_uni = max(associated_unis, key=lambda uni: uni_counts[uni])
            associated_unis = [highest_uni]
        top_cities.append({
            'Location': loc,
            'Count': count,
            'AssociatedUniversities': associated_unis
        })

    return top_cities
