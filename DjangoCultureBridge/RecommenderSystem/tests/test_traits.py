# test case for the recommend_reviews function in recommender.py

import pandas as pd
from ..recommender import recommend_reviews

def test_recommend_reviews():
    # Mock data
    processed_selections = {'traits': ['vibrant', 'innovative', 'cultural']}
    reviews_data = {
        'University Name': ['UniA', 'UniB', 'UniC', 'UniD', 'UniE'],       
        'Description': [
            'A vibrant and cultural hub with an innovative tech scene',
            'Known for its vibrant music scene and cultural landmarks',
            'A small yet vibrant city with a focus on cultural events',
            'Innovative tech community and vibrant startup ecosystem',
            'Cultural heritage and vibrant festivals with innovative arts'
        ]
    }
    reviews_df = pd.DataFrame(reviews_data)

    # Expected output: DataFrame with top universities based on buzzword similarity scores
    expected_uni_names = ['UniA', 'UniE', 'UniD', 'UniB', 'UniC']  

    # Call the function with mock data
    result_df = recommend_reviews(processed_selections, reviews_df)

    # Verify that the result matches the expected output
    assert len(result_df) == 5, "Should return top 5 universities"
    result_uni_names = result_df['University Name'].tolist()
    assert result_uni_names == expected_uni_names, f"Expected university order: {expected_uni_names}, but got: {result_uni_names}"