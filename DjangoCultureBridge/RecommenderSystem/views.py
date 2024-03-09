from django.apps import apps
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from .recommender import process_recommendations, recommend_courses, recommend_events, recommend_music, recommend_reviews, city_recommender
import pandas as pd

class RecommendationView(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        # Access the app config
        app_config = apps.get_app_config('RecommenderSystem')
        
        data = request.data
        processed_selections = process_recommendations(data)
        
        # Access dataframes from the app config
        uniCourses_df = app_config.uniCourses_df
        liveEvents_df = app_config.liveEvents_df
        spotifyPlaylist_df = app_config.spotifyPlaylist_df
        reviews_df = app_config.reviews_df

        course_recommendations = recommend_courses(processed_selections, uniCourses_df)
        event_recommendations = recommend_events(processed_selections, liveEvents_df)
        music_recommendations = recommend_music(processed_selections, spotifyPlaylist_df)
        review_recommendations = recommend_reviews(processed_selections, reviews_df)

         # Aggregate all recommendations into a single variable
        total_recommendations = {
            'courses': course_recommendations,
            'events': event_recommendations,
            'music': music_recommendations,
            'reviews': review_recommendations
        }
        
        print(total_recommendations)

        # Call city_recommender function with the aggregated recommendations
        city_recommendations = city_recommender(total_recommendations)

        print(city_recommendations)

        return JsonResponse(course_recommendations, safe=False)

'''
class SongRecommenderView(APIView):
    def get(self, request):
        song_title = request.GET.get('song', '')
        
        if not song_title:
            return JsonResponse({'error': 'No song title provided.'}, status=400)

        recommendations = song_recommender(song_title)
        if recommendations.empty:
            return JsonResponse({'error': 'Song not found.'}, status=404)

        return JsonResponse(recommendations.to_dict(orient='records'), safe=False)

class CityRecommenderView(APIView):
    def get(self, request):
        # Assuming population_count is passed as a query parameter
        population_count = request.GET.get('population', 0)
        try:
            population_count = float(population_count)
        except ValueError:
            return JsonResponse({'error': 'Invalid population count provided.'}, status=400)
        threshold = request.GET.get('threshold', 0.3)
        try:
            threshold = float(threshold)
        except ValueError:
            return JsonResponse({'error': 'Invalid threshold provided.'}, status=400)
        recommendations = city_recommender(population_count, threshold)
        return JsonResponse(recommendations.to_dict(orient='records'), safe=False)

class EventRecommenderView(APIView):
    def get(self, request):
        event_type = request.GET.get('event_type', '')
        recommendations = event_recommender(event_type)
        return JsonResponse(recommendations.to_dict(orient='records'), safe=False)

class UniversityRecommenderView(APIView):
    def get(self, request):
        course_name = request.GET.get('course_name', '')
        recommendations = uni_recommender(course_name)
        return JsonResponse(recommendations.to_dict(orient='records'), safe=False)
'''