# Views to handle POST requests for recommendations based on user input

from django.apps import apps
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from .recommender import process_recommendations, recommend_courses, recommend_events, recommend_music, recommend_reviews, city_recommender

class RecommendationView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        # Retrieve dataframes genereated in the app config
        app_config = apps.get_app_config('RecommenderSystem')
        
        # Extract data from the POST request
        data = request.data
        processed_selections = process_recommendations(data)
        
        # Access the dataframes from the app config
        uniCourses_df = app_config.uniCourses_df
        liveEvents_df = app_config.liveEvents_df
        spotifyPlaylist_df = app_config.spotifyPlaylist_df
        reviews_df = app_config.reviews_df

        # Call the relevant recommendation functions for each category with the user processed selections
        course_recommendations = recommend_courses(processed_selections, uniCourses_df)
        event_recommendations = recommend_events(processed_selections, liveEvents_df)
        music_recommendations = recommend_music(processed_selections, spotifyPlaylist_df)
        review_recommendations = recommend_reviews(processed_selections, reviews_df)

         # Aggregate all recommendations into a single dictionary
        total_recommendations = {
            'courses': course_recommendations,
            'events': event_recommendations,
            'music': music_recommendations,
            'reviews': review_recommendations
        }
        
        # Testing
        print(total_recommendations)

        # Call city_recommender function with the aggregated recommendations to determine the final city recommendations
        city_recommendations = city_recommender(total_recommendations)

        # Testing
        print(city_recommendations)

        return JsonResponse(city_recommendations, safe=False) # Return the city recommendations as a JSON response