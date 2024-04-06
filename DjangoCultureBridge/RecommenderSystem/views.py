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
        starred_category = data.get('starredCategory', None)
        processed_selections = process_recommendations(data)
        
        # Access the dataframes from the app config
        uniCourses_df = app_config.uniCourses_df
        liveEvents_df = app_config.liveEvents_df
        spotifyPlaylist_df = app_config.spotifyPlaylist_df
        reviews_df = app_config.reviews_df
        
        total_recommendations = {}

        # Conditionally call the recommendation functions based on user input
        if processed_selections.get('courses'):
            course_recommendations = recommend_courses(processed_selections, uniCourses_df)
            total_recommendations['courses'] = course_recommendations

        if processed_selections.get('events'):
            event_recommendations = recommend_events(processed_selections, liveEvents_df)
            total_recommendations['events'] = event_recommendations

        if processed_selections.get('genres'):
            music_recommendations = recommend_music(processed_selections, spotifyPlaylist_df)
            total_recommendations['music'] = music_recommendations

        if processed_selections.get('traits'):
            review_recommendations = recommend_reviews(processed_selections, reviews_df)
            total_recommendations['reviews'] = review_recommendations
        
        # Testing - print each part divided by a new line
        for category, recommendations in total_recommendations.items():
            print(f"{category}: {recommendations}\n")

        # Call city_recommender function with the aggregated recommendations to determine the final city recommendations
        city_recommendations = city_recommender(total_recommendations, starred_category)

        # Testing
        print(city_recommendations)

        return JsonResponse(city_recommendations, safe=False) # Return the city recommendations as a JSON response