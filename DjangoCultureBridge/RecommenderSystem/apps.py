from django.apps import AppConfig
import os

class RecommendersystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'RecommenderSystem'
    
    def ready(self):
        # Import your data loading functions here to avoid circular imports
        from .recommender import load_json_lines, flatten_uni_courses, create_dataframe, flatten_live_events, flatten_spotify_playlist, flatten_reviews, load_json
        
        # Define file paths
        uniCourses_file_path = r'C:\Users\srisk\OneDrive - Technological University Dublin\Documents\YEAR 4 SEM 1\Final Year Project\Coding\Culture-Bridge\DjangoCultureBridge\DataFiles\uniCourses_data.json'
        liveEvents_file_path = r'C:\Users\srisk\OneDrive - Technological University Dublin\Documents\YEAR 4 SEM 1\Final Year Project\Coding\Culture-Bridge\DjangoCultureBridge\DataFiles\liveEvents_data.json'
        spotifyPlaylist_file_path = r'C:\Users\srisk\OneDrive - Technological University Dublin\Documents\YEAR 4 SEM 1\Final Year Project\Coding\Culture-Bridge\DjangoCultureBridge\DataFiles\spotifyPlaylist_data.json'
        reviews_file_path = r'C:\Users\srisk\OneDrive - Technological University Dublin\Documents\YEAR 4 SEM 1\Final Year Project\Coding\Culture-Bridge\DjangoCultureBridge\DataFiles\reviews_data.json'
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
        data = load_json(reviews_file_path)  # Assuming load_json is similar to load_json_lines but for a single JSON object
        flat_data = flatten_reviews(data)
        self.reviews_df = create_dataframe(flat_data)
        
        # Log to console that data has been loaded (optional)
        print("RecommenderSystem data loaded successfully.")
