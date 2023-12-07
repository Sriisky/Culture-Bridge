import pandas as pd
import numpy as np
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Read in the csv files
module_dir = os.path.dirname(__file__)
songs_csv_filepath = os.path.join(module_dir, 'SampleCSV', 'songs_genres.csv')
cities_csv_filepath = os.path.join(module_dir, 'SampleCSV', 'cities.csv')
events_csv_filepath = os.path.join(module_dir, 'SampleCSV', 'events.csv')
universities_csv_filepath = os.path.join(module_dir, 'SampleCSV', 'universities.csv')

songs_df = pd.read_csv(songs_csv_filepath)
cities_df = pd.read_csv(cities_csv_filepath)
events_df = pd.read_csv(events_csv_filepath)
universities_df = pd.read_csv(universities_csv_filepath)

# Following section only takes key information I need
song_imp_features = ['song_name', 'genre']
songs = songs_df[song_imp_features]

cities_imp_features = ['country', 'population']
cities = cities_df[cities_imp_features]

events_imp_features = ['event_type']
events = events_df[events_imp_features]

universities_imp_features = ['course_name', 'university_name']
universities = universities_df[universities_imp_features]

# Combine the values together for each dataset using .loc to avoid SettingWithCopyWarning
songs.loc[:, 'combined_songs'] = songs['song_name'] + ' ' + songs['genre']
cities.loc[:, 'combined_cities'] = cities['country'] + ' ' + cities['population'].astype(str)
events.loc[:, 'combined_events'] = events['event_type']
universities.loc[:, 'combined_unis'] = universities['course_name'] + ' ' + universities['university_name']


# Create a count vectorizer object
cv = CountVectorizer()

# Creating a count vectorizer for each combined features
songs_count_matrix = cv.fit_transform(songs['combined_songs'])
cities_count_matrix = cv.fit_transform(cities['combined_cities'])
events_count_matrix = cv.fit_transform(events['combined_events'])
universities_count_matrix = cv.fit_transform(universities['combined_unis'])

# Calculate the cosine similarity of items in each of the datasets
song_cosin_sim = cosine_similarity(songs_count_matrix)
cities_cosin_sim = cosine_similarity(cities_count_matrix)
events_cosin_sim = cosine_similarity(events_count_matrix)
universities_cosin_sim = cosine_similarity(universities_count_matrix)


# Function for song recommendations (based on a given song)
def song_recommender(song_title):
    if song_title not in songs_df['song_name'].values:
        return pd.DataFrame() 
    # Find an index of the genre the user has inputted
    song_index = songs_df[songs_df.song_name == song_title]['ID'].values[0]
    # Find cosine similarity in respect to the index num of the given genre
    similar_songs = list(enumerate(song_cosin_sim[song_index]))
    # Sort cosin similarity scores descending
    sorted_similar_songs = sorted(similar_songs, key=lambda x: x[1], reverse=True)
    # Extract index nums from sorted scores
    song_indices = [i[0] for i in sorted_similar_songs]
    # Extract song names and genres from the extracted index numbers
    recommended_songs = songs_df.loc[song_indices, ['song_name', 'genre']]
    recommended_songs = recommended_songs.reset_index(drop=True)

    return recommended_songs.iloc[1:11] # start from 1 to ignore the song the user inputted

# Testing
# print(song_recommender('Mentirosa'))


# Function for city recommendations (based on extroversion or introversion)
# Threshold is going to be the percentage difference allowed from population_count
def city_recommender(population_count, threshold = 0.3):
    # Calculate the range of population counts we consider "similar"
    min_population = population_count * (1 - threshold)
    max_population = population_count * (1 + threshold)

    # Find cities where the population is within the range
    similar_cities = cities_df[(cities_df['population'] >= min_population) &
                               (cities_df['population'] <= max_population)]
    similar_cities = similar_cities.reset_index(drop = True)

    # Return the city names
    return similar_cities.head(5)

# Function for event recommender (based on event_genre)
def event_recommender(eventType):
    # Find indices of all events of the inputted type
    event_index = events_df[events_df.event_type == eventType]['ID'].values[0]
    # Find cosine similarity in respect to the index num of the given type
    similar_events = list(enumerate(events_cosin_sim[event_index]))
    # Sort the events based on the similarity scores in descending order
    sorted_similar_events = sorted(similar_events, key=lambda x: x[1], reverse=True)
    # Extract the indices of the sorted similar events
    event_indices = [i[0] for i in sorted_similar_events]
    # Create a DataFrame for the recommended events
    recommended_events = events_df.iloc[event_indices][['event_name', 'location', 'event_type']]
    # Reset the index of the recommended events DataFrame
    recommended_events = recommended_events.reset_index(drop=True)
    return recommended_events.head(10)


# Function for university recommender (based on course name)
def uni_recommender(courseName):
    # Find the index of the course the user has inputted
    course_indices = universities_df[universities_df.course_name == courseName].index
    # Calculate the average cosine similarity score for the given course
    course_cosine_scores = np.mean(universities_cosin_sim[course_indices], axis=0)
    # Get similarity scores for all courses with respect to the input course
    similar_courses = list(enumerate(course_cosine_scores))
    # Sort the courses based on the similarity scores in descending order
    sorted_similar_courses = sorted(similar_courses, key=lambda x: x[1], reverse=True)
    # Extract the indices of the sorted similar courses
    course_indices = [i[0] for i in sorted_similar_courses]
    # Create a DataFrame for the recommended courses
    recommended_uni = universities_df.iloc[course_indices][['university_name', 'course_name']]
    # Reset the index of the recommended courses DataFrame
    recommended_uni = recommended_uni.reset_index(drop=True)
    return recommended_uni.head(10)
