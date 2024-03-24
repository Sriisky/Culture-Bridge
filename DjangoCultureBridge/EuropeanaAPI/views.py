# Views to handle the requests to the Europeana API

from rest_framework.views import APIView
from django.http import JsonResponse
from .museums import search_europeana

class MuseumView(APIView):
    def get(self, request):
        cityName = request.GET.get('cityName')
        if not cityName:
            return JsonResponse({'error': 'City name parameter is missing'})

        museums = search_europeana(cityName)
        return JsonResponse({'museums': museums})
