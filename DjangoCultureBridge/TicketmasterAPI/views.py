from rest_framework.views import APIView
from django.http import JsonResponse
from .events import get_live_events
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'keys.env')
load_dotenv(dotenv_path)

class EventsView(APIView):
    def get(self, request):
        countryCode = request.GET.get('countryCode')
        if not countryCode:
            return JsonResponse({'error': 'Country code parameter is missing'})

        api_key = os.getenv('TICKETMASTER_API_KEY')
        events = get_live_events(api_key, countryCode)
        return JsonResponse({'liveEvents': events})