from rest_framework.views import APIView
from django.http import JsonResponse
from .auth import authenticate

class PlaylistView(APIView):
    def get(self, request):
        countryCode= request.GET.get('countryCode')
        if not countryCode:
            return JsonResponse({'error': 'Country code parameter is missing'})

        playlist = authenticate(countryCode)  # Use the authenticater to get playlist data
        return JsonResponse({'playlist': playlist})