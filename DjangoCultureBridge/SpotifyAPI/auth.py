import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Dictionary of all playlist ID's for the top-50 tracks of a country
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

def authenticate(countryCode):
    client_credentials_manager = SpotifyClientCredentials(client_id='41a902302c9b4c80a9ab4ea8e7d15306',
                                                        client_secret='1b082af1f5964f568ff95a2aa1987a4e')

    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Fetch the top tracks for the specified country using countryCode
    playlist_id = playlist_configs.get(countryCode)
    if not playlist_id:
        return []  # Return empty list if countryCode is not found in the dictionary

    top_tracks = sp.playlist_tracks(playlist_id=playlist_id, market=countryCode)

    # Extract relevant information from top_tracks
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
    
    return playlist
