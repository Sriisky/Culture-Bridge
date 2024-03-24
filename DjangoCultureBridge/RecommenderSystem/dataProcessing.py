# Used by apps.py to load data into dataframes for the recommender system

import pandas as pd
import numpy as np
import json

# Function to load data from a JSON lines file (each line is a separate JSON object)
def load_json_lines(file_path):
    data_list = []
    with open(file_path, 'r') as file:
        for line in file:
            data_list.append(json.loads(line))
    return data_list

# Function to load data from a JSON file containing a single JSON object
def load_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

# Function to create a pandas DataFrame from a list of dictionaries (transitioning nested data to columns)
def create_dataframe(flat_data):
    return pd.DataFrame(flat_data)

# Function to flatten university courses data into a list of dictionaries
def flatten_uni_courses(data_list):
    flat_data = []
    for university in data_list:
        uni_name = university['uniName']
        for course in university['courses']:
            flat_data.append({
                'University Name': uni_name,
                'Course Name': course['Course Name']
            })
    return flat_data

# Function to flatten live events, taking into consideration format discrepancies
def flatten_live_events(data_list):
    flat_data = []
    for event in data_list:
        # Try-except block to catch missing keys and handle them gracefully
        try:
            # Initialize default values for keys
            event_name = event.get('title') or event.get('name')  # Support for both 'title' and 'name' keys
            date = event.get('date')
            genre = event.get('genre', '')  # Empty string if 'genre' is not available
            subgenre = event.get('subgenre', '')  
            country_code = event.get('countryCode')
            location = event.get('location', '')  

            # Append a dictionary with the extracted data to the flat_data list
            flat_data.append({
                'Event Name': event_name,
                'Date': date,
                'Genre': genre,
                'Subgenre': subgenre,
                'Country Code': country_code,
                'Location': location
            })
        except KeyError as e:
            print(f"Missing key in event: {e}")
            continue  # Skip this event and continue with the next
    return flat_data

# Flatten Spotify playlist data into a list of dictionaries, handling various formats
def flatten_spotify_playlist(data_list):
    flat_data = []
    for item in data_list:
        # Handle track entries
        if 'title' in item or 'name' in item:
            title = item.get('title', '') or item.get('name', '')
            artist = item.get('artist', '')
            country_code = item.get('countryCode', '')
            flat_data.append({
                'Title': title,
                'Artist': artist,
                'Country Code': country_code,
                # Set genre statistics to None for individual tracks
                'Hip hop/Rap/R&b': None,
                'EDM': None,
                'Pop': None,
                'Rock/Metal': None,
                'Latin/Reggaeton': None,
                'Other': None
            })
        # Handle genre statistics entries
        else:
            flat_data.append({
                'Title': None,  
                'Artist': None, 
                'Country Code': item['countryCode'],
                'Hip hop/Rap/R&b': item.get('Hip hop/Rap/R&b'),
                'EDM': item.get('EDM'),
                'Pop': item.get('Pop'),
                'Rock/Metal': item.get('Rock/Metal'),
                'Latin/Reggaeton': item.get('Latin/Reggaeton'),
                'Other': item.get('Other')
            })
    return flat_data

# Flatten review data into a list of dictionaries
def flatten_reviews(data):
    flat_data = []
    for institution, reviews in data.items():
        for review in reviews:
            flat_data.append({
                'University Name': institution,
                'Time Spent': review['timeSpent'],
                'Description': review['description']
            })
    return flat_data