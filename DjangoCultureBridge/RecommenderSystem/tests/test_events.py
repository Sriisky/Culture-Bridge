# Test case for recommending events based on user selections

import pandas as pd
from ..recommender import recommend_events

def test_recommend_events():
    # Mock data
    processed_selections = {'events': ['Rock', 'Pop']}
    liveEvents_data = {
        'Event Name': ['Concert A', 'Festival B', 'Concert C', 'Festival D', 'Concert E', 'Festival F', 'Concert G', 'Festival H'],
        'Genre': ['Rock', 'Pop', 'Jazz', 'Rock', 'Pop', 'Classical', 'Rock', 'Jazz'],
        'Subgenre': ['Alternative', 'Electro', 'Smooth', 'Punk', 'Indie', 'Opera', 'Metal', 'Swing'],
        'Country Code': ['US', 'US', 'FR', 'UK', 'UK', 'DE', 'US', 'AU']
    }
    liveEvents_df = pd.DataFrame(liveEvents_data)

    # Call the function with the mock data
    country_counts, top_countries_events = recommend_events(processed_selections, liveEvents_df)

    # Expected output checks
    expected_top_countries = ['US', 'UK']  # Based on mock data, US and UK should have the highest counts
    assert list(country_counts['Country Code']) == expected_top_countries, "The top countries do not match the expected ones."

    # Check if the top_countries_events includes correct country codes
    assert set(top_countries_events.keys()) == set(expected_top_countries), "The country codes in top_countries_events do not match the expected top countries."

    # Check for the correct number of sampled events per country
    for country_code, events in top_countries_events.items():
        assert len(events) <= 3, f"Country {country_code} has more than 3 sampled events."
