# Views to handle GET requests for Spotify playlist data

from rest_framework.views import APIView
from django.http import JsonResponse
from .auth import authenticate

class PlaylistView(APIView):
    def get(self, request):
        countryCode= request.GET.get('countryCode')
        if not countryCode:
            return JsonResponse({'error': 'Country code parameter is missing'})

        playlist = authenticate(countryCode) 
        return JsonResponse({'playlist': playlist})