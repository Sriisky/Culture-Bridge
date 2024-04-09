# Test case for the recommend_courses function in recommender.py

import pandas as pd
from ..recommender import recommend_courses

# Test case for recommending courses based on user selections
def test_recommend_courses():
    # Mock data
    processed_selections = {'courses': ['Data Science', 'Artificial Intelligence']}
    uniCourses_data = {
        'University Name': ['UniA', 'UniA', 'UniB', 'UniB', 'UniC', 'UniC'],
        'Course Name': [
            'Data Science', 'Information Technology', 
            'Computer Science', 'Artificial Intelligence',
            'Data Science', 'Artificial Intelligence'
        ]
    }
    uniCourses_df = pd.DataFrame(uniCourses_data)
    
    # Expected output: Dictionary with university names as keys and lists of recommended courses as values
    expected_result = {
        'UniB': ['Artificial Intelligence'],
        'UniC': ['Data Science', 'Artificial Intelligence']  
    }
    
    # Call the function with mock data
    result = recommend_courses(processed_selections, uniCourses_df, top_n=2)
    
    # Verify that the result matches the expected output
    assert isinstance(result, dict), "The result should be a dictionary."
    assert set(result.keys()) == set(expected_result.keys()), "The university names in the result should match the expected ones."
    for uni in expected_result:
        assert all(course in result[uni] for course in expected_result[uni]), f"Matching courses for {uni} are incorrect."
