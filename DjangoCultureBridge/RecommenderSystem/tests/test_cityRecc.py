# Test cases for city_recommender function in recommender.py

import pandas as pd
from ..recommender import city_recommender

# Test case for returning the top 3 locations
def test_city_recommender_returns_top_n_locations():
    total_recommendations = {
        'courses': ['HDA', 'OTH', 'UNIPG', 'FHNW', 'MDU'],
        'reviews': pd.DataFrame({
            'University Name': ['HDA', 'MDU', 'FHNW', 'UNIPG', 'UIA'],
            'Similarity Score': [0.9, 0.8, 0.85, 0.75, 0.95] 
        }),
        'events': (None, {
            'DE': [{'Event Name': 'Tech Meetup', 'Genre': 'Technology'}],
            'SE': [{'Event Name': 'Music Festival', 'Genre': 'Pop'}],
            'IT': [{'Event Name': 'Art Conference', 'Genre': 'Art'}],
            'NL': [{'Event Name': 'Startup Pitch', 'Genre': 'Business'}],
            'NO': [{'Event Name': 'Literature Seminar', 'Genre': 'Literature'}]
        }),
        'music': pd.DataFrame({
            'Country Code': ['DE', 'IT', 'ES', 'NL', 'NO'],
            'combined_score': [0.95, 0.85, 0.75, 0.65, 0.55] 
        })
    }
    top_cities = city_recommender(total_recommendations)
    assert len(top_cities) == 3, "Should return exactly 3 top locations."

# Test case for returning the top 3 locations without a starred category
def test_city_recommender_without_starred_category():
    total_recommendations = {
        'courses': ['HDA', 'OTH', 'UNIPG', 'FHNW', 'MDU'],
        'reviews': pd.DataFrame({
            'University Name': ['HDA', 'MDU', 'FHNW', 'UNIPG', 'UIA'],
            'Similarity Score': [0.9, 0.8, 0.85, 0.75, 0.95]  
        }),
        'events': (None, {
            'DE': [{'Event Name': 'Tech Meetup', 'Genre': 'Technology'}],
            'SE': [{'Event Name': 'Music Festival', 'Genre': 'Pop'}],
            'IT': [{'Event Name': 'Art Conference', 'Genre': 'Art'}],
            'NL': [{'Event Name': 'Startup Pitch', 'Genre': 'Business'}],
            'NO': [{'Event Name': 'Literature Seminar', 'Genre': 'Literature'}]
        }),
        'music': pd.DataFrame({
            'Country Code': ['DE', 'IT', 'ES', 'NL', 'NO'],
            'combined_score': [0.95, 0.85, 0.75, 0.65, 0.55] 
        })
    }
    top_cities = city_recommender(total_recommendations)
    expected_top_countries = ['DE', 'IT', 'SE']
    actual_top_countries = [city['Location'] for city in top_cities]
    assert actual_top_countries == expected_top_countries, "Top countries do not match expected ones without a starred category."
    
# Test case for returning the top 3 locations with a starred category
def test_city_recommender_with_starred_category_reviews():
    total_recommendations = {
        'courses': ['HDA', 'OTH', 'UNIPG', 'FHNW', 'MDU'],
        'reviews': pd.DataFrame({
            'University Name': ['HDA', 'MDU', 'FHNW', 'UNIPG', 'UIA'],
            'Similarity Score': [0.8, 0.95, 0.85, 0.75, 0.65]
        }),
        'events': (None, {
            'DE': [{'Event Name': 'Tech Meetup', 'Genre': 'Technology'}],
            'SE': [{'Event Name': 'Music Festival', 'Genre': 'Pop'}],
            'IT': [{'Event Name': 'Art Conference', 'Genre': 'Art'}],
            'NL': [{'Event Name': 'Startup Pitch', 'Genre': 'Business'}],
            'NO': [{'Event Name': 'Literature Seminar', 'Genre': 'Literature'}]
        }),
        'music': pd.DataFrame({
            'Country Code': ['DE', 'IT', 'ES', 'NL', 'NO'],
            'combined_score': [0.95, 0.85, 0.75, 0.65, 0.55]  
        })
    }
    top_cities_star_reviews = city_recommender(total_recommendations, starred_category='reviews')
    expected_top_country_reviews = 'SE'  
    top_countries = [city['Location'] for city in top_cities_star_reviews]
    assert expected_top_country_reviews in top_countries, f"'{expected_top_country_reviews}' should be among the top locations with extra weight in reviews."

# Test case to ensure output is formatted correctly
def test_city_recommender_output_structure():
    total_recommendations = {
        'courses': ['HDA', 'OTH', 'UNIPG', 'FHNW', 'MDU'],
        'reviews': pd.DataFrame({
            'University Name': ['HDA', 'MDU', 'FHNW', 'UNIPG', 'UIA'],
            'Similarity Score': [0.9, 0.8, 0.85, 0.75, 0.95]  
        }),
        'events': (None, {
            'DE': [{'Event Name': 'Tech Meetup', 'Genre': 'Technology'}],
            'SE': [{'Event Name': 'Music Festival', 'Genre': 'Pop'}],
            'IT': [{'Event Name': 'Art Conference', 'Genre': 'Art'}],
            'NL': [{'Event Name': 'Startup Pitch', 'Genre': 'Business'}],
            'NO': [{'Event Name': 'Literature Seminar', 'Genre': 'Literature'}]
        }),
        'music': pd.DataFrame({
            'Country Code': ['DE', 'IT', 'ES', 'NL', 'NO'],
            'combined_score': [0.95, 0.85, 0.75, 0.65, 0.55]  
        })
    }
    top_cities = city_recommender(total_recommendations)
    for city_info in top_cities:
        assert all(key in city_info for key in ['Location', 'Count']), "Each item must have 'Location' and 'Count'."
        if city_info['Location'] in ['DE', 'IT', 'SE', 'NL', 'NO']:
            assert 'AssociatedUniversities' in city_info, f"{city_info['Location']} should have associated universities listed."

# Test case for returning the top 3 locations with music as starred category
def test_city_recommender_different_starred_categories():
    total_recommendations = {
        'courses': ['HDA', 'OTH', 'UNIPG', 'FHNW', 'MDU'],
        'reviews': pd.DataFrame({
            'University Name': ['HDA', 'MDU', 'FHNW', 'UNIPG', 'UIA'],
            'Similarity Score': [0.9, 0.8, 0.85, 0.75, 0.95]  
        }),
        'events': (None, {
            'DE': [{'Event Name': 'Tech Meetup', 'Genre': 'Technology'}],
            'SE': [{'Event Name': 'Music Festival', 'Genre': 'Pop'}],
            'IT': [{'Event Name': 'Art Conference', 'Genre': 'Art'}],
            'NL': [{'Event Name': 'Startup Pitch', 'Genre': 'Business'}],
            'NO': [{'Event Name': 'Literature Seminar', 'Genre': 'Literature'}]
        }),
        'music': pd.DataFrame({
            'Country Code': ['DE', 'IT', 'ES', 'NL', 'NO'],
            'combined_score': [0.95, 0.85, 0.75, 0.65, 0.55] 
        })
    }
    top_cities_star_music = city_recommender(total_recommendations, starred_category='music')
    assert 'DE' in [city['Location'] for city in top_cities_star_music], "With 'music' starred, 'DE' should be top due to extra weighting."

# Test case for returning recommendations with a missing category
def test_city_recommender_with_empty_category():
    # Setup with an empty 'music' DataFrame
    total_recommendations = {
        'courses': ['HDA', 'OTH', 'UNIPG', 'FHNW', 'MDU'],
        'reviews': pd.DataFrame({
            'University Name': ['HDA', 'MDU', 'FHNW', 'UNIPG', 'UIA'],
            'Similarity Score': [0.9, 0.8, 0.85, 0.75, 0.95]
        }),
        'events': (None, {
            'DE': [{'Event Name': 'Tech Meetup', 'Genre': 'Technology'}],
            'SE': [{'Event Name': 'Music Festival', 'Genre': 'Pop'}],
            'IT': [{'Event Name': 'Art Conference', 'Genre': 'Art'}],
            'NL': [{'Event Name': 'Startup Pitch', 'Genre': 'Business'}],
            'NO': [{'Event Name': 'Literature Seminar', 'Genre': 'Literature'}]
        }),
        'music': pd.DataFrame()  # Empty DataFrame representing no available music data
    }
    top_cities= city_recommender(total_recommendations)
    
    # Even if a category is missing, recommendations should still be made based on other categories
    assert len(top_cities) > 0, "Should still return recommendations based on other categories, even when music data is empty."
