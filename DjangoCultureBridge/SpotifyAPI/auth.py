# File to retrieve top 50 tracks of a country from Spotify API

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json
import os
from dotenv import load_dotenv

# Load environment variables from keys.env
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'keys.env')
load_dotenv(dotenv_path)

json_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'spotifyPlaylist_data.json')

# Function to save the top 50 tracks of a country to a JSON file
def save_to_json_file(new_data, countryCode):
    existing_data = read_existing_data(json_file_path)
    if not is_duplicate(countryCode, existing_data):
        with open(json_file_path, 'a') as file:
            for entry in new_data:
                entry_to_save = {
                    'title': entry['title'],
                    'artist': entry['artist'],
                    'countryCode': countryCode
                }
                json.dump(entry_to_save, file)
                file.write('\n')

# Function to read existing data from a JSON file
def read_existing_data(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r') as file:
        return [json.loads(line) for line in file]

# Function to check if the country code is already in the JSON file
def is_duplicate(countryCode, existing_data):
    for existing_song in existing_data:
        if existing_song['countryCode'] == countryCode:
            return True
    return False

# Dictionary of all playlist ID's for the top-50 tracks of a country
# Country codes are also used to specify the market code so that the tracks are always visible
playlist_configs = {
    'US': '37i9dQZEVXbLRQDuF5jeBp',  
    'DE': '37i9dQZEVXbJiZcmkrIHGU',  
    'ES': '37i9dQZEVXbNFJfN1Vw8d9',
    'NO': '37i9dQZEVXbJvfa0Yxg7E7',
    'AT': '37i9dQZEVXbKNHh6NIXu36',
    'SI': '2mN8qgKnWkvm3ZyQt0l4VB',
    'FI': '37i9dQZEVXbMxcczTSoGwZ',
    'IT': '37i9dQZEVXbIQnj7RRhdSX',
    'SE': '37i9dQZEVXbLoATJ81JYXz',
    'HR': '7HLFayaacjut2hKJzCzpLb',
    'SK': '37i9dQZEVXbKIVTPX9a2Sb',
    'CH': '37i9dQZEVXbJiyhoAPEfMK',
    'NL': '37i9dQZEVXbKCF6dqVpDkS',   
}

# Function to authenticate with Spotify API and fetch the top 50 tracks of a country
def authenticate(countryCode):
    client_credentials_manager = SpotifyClientCredentials(
        client_id=os.getenv('SPOTIFY_CLIENT_ID'),
        client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'))

    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Fetch the top tracks for the specified country using countryCode
    playlist_id = playlist_configs.get(countryCode)
    if not playlist_id:
        return []  # Return empty list if countryCode is not found in the dictionary

    top_tracks = sp.playlist_tracks(playlist_id=playlist_id, market=countryCode)

    # Extract information from top_tracks
    playlist = []
    for track in top_tracks['items']:
        track_info = {
            'title': track['track']['name'],
            'artist': ', '.join(artist['name'] for artist in track['track']['artists']),
            'length': track['track']['duration_ms'],  # Length of the track in milliseconds
            'thumbnail': track['track']['album']['images'][0]['url'],  # URL of the first thumbnail image
            'spotify_url': track['track']['external_urls']['spotify']
        }
        playlist.append(track_info)
    
    save_to_json_file(playlist, countryCode)
    return playlist
