# Test cases for the process_recommendations function in recommender.py

from ..recommender import process_recommendations

def test_process_recommendations():
    selections = {
        'genres': ['rock', 'jazz'],
        'events': ['concert', 'festival'],
        'courses': ['math', 'science'],
        'traits': ['outgoing', 'curious']
    }
    expected = {
        'genres': ['rock', 'jazz'],
        'events': ['concert', 'festival'],
        'courses': ['math', 'science'],
        'traits': ['outgoing', 'curious']
    }
    assert process_recommendations(selections) == expected

# Test case for empty input selections
def test_process_recommendations_empty_input():
    input_selections = {}
    expected_output = {
        'genres': [],
        'events': [],
        'courses': [],
        'traits': []
    }
    assert process_recommendations(input_selections) == expected_output


