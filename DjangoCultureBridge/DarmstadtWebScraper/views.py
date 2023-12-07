from django.http import JsonResponse
from .scraper import get_courses, get_events  # Functions you'll create in scraper_utils.py

def courses_view(request):
    courses = get_courses()  # Use the scraper to get course data
    return JsonResponse({'courses': courses})

def events_view(request):
    events = get_events()  # Use the scraper to get event data
    return JsonResponse({'events': events})
