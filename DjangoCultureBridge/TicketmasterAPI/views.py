from rest_framework.views import APIView
from django.http import JsonResponse
from .events import get_live_events

class EventsView(APIView):
    def get(self, request):
        countryCode = request.GET.get('countryCode')
        if not countryCode:
            return JsonResponse({'error': 'Country code parameter is missing'})

        api_key = 'qgwsKerOhwCv2yVdgA5Nj9ASOyCiFkcg'
        events = get_live_events(api_key, countryCode)
        return JsonResponse({'liveEvents': events})