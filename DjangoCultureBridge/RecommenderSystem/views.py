from django.http import JsonResponse
from rest_framework.views import APIView
from .recommender import song_recommender, city_recommender, event_recommender, uni_recommender

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
