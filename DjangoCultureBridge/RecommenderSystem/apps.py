# Responsible for initializing the data frames used by the recommender system

from django.apps import AppConfig
import os

# Configuration class
class RecommendersystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'RecommenderSystem'
    
    # Function to perform data loading when the app is ready
    def ready(self):
        # Import data loading functions here to avoid circular imports (ensures all dependencies are loaded first before imports are resolved)
        from .dataProcessing import load_json_lines, flatten_uni_courses, create_dataframe, flatten_live_events, flatten_spotify_playlist, flatten_reviews, load_json
        
        # Define file paths
        uniCourses_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'uniCourses_data.json')
        liveEvents_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'liveEvents_data.json')
        spotifyPlaylist_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'spotifyPlaylist_data.json')
        reviews_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'reviews_data.json')
        
        # Load and process uniCourses data
        data_list = load_json_lines(uniCourses_file_path)
        flat_data = flatten_uni_courses(data_list)
        self.uniCourses_df = create_dataframe(flat_data)
        
        # Load and process liveEvents data
        data_list = load_json_lines(liveEvents_file_path)
        flat_data = flatten_live_events(data_list)
        self.liveEvents_df = create_dataframe(flat_data)
        
        # Load and process spotifyPlaylist data
        data_list = load_json_lines(spotifyPlaylist_file_path)
        flat_data = flatten_spotify_playlist(data_list)
        self.spotifyPlaylist_df = create_dataframe(flat_data)
        
        # Load and process reviews data
        data = load_json(reviews_file_path)
        flat_data = flatten_reviews(data)
        self.reviews_df = create_dataframe(flat_data)
        
        # Log to console that data has been loaded
        print("RecommenderSystem data loaded successfully.")
