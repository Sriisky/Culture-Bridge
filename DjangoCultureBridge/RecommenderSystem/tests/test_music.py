# Test cases for the recommend_music function in the recommender.py

import pandas as pd
from ..recommender import recommend_music

def test_recommend_music():
    # Mock data
    processed_selections = {'genres': ['Pop', 'Rock', 'Jazz']}
    data = {
        'Country Code': ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'KR', 'BR', 'IT'],
        'Pop': [20, 15, 10, 5, 2, 25, 5, 20, 15, 1],
        'Rock': [30, 25, 20, 15, 10, 30, 10, 25, 20, 5],
        'Jazz': [40, 35, 30, 25, 20, 35, 15, 30, 25, 10],
        'Classical': [10, 5, 2, 1, 0, 5, 0, 5, 10, 20]  
    }
    spotifyPlaylist_df = pd.DataFrame(data)
    # Expected output, assuming the function correctly calculates combined scores and ranks the top 5
    expected_countries = pd.DataFrame({
        'Country Code': ['US', 'GB', 'FR', 'CA', 'KR'],
        'combined_score': [90, 75, 90, 60, 75],
        'Pop': [20, 15, 25, 10, 20],
        'Rock': [30, 25, 30, 20, 25],
        'Jazz': [40, 35, 35, 30, 30]
    })

    result = recommend_music(processed_selections, spotifyPlaylist_df)
    # Assert that the resulting DataFrame contains the expected Country Codes in any order
    assert set(result['Country Code']) == set(expected_countries['Country Code'])
    
    # Check that the combined scores are calculated correctly
    for country_code in expected_countries['Country Code']:
        country_row = result[result['Country Code'] == country_code]
        expected_row = expected_countries[expected_countries['Country Code'] == country_code]
        assert country_row['combined_score'].values[0] == expected_row['combined_score'].values[0]