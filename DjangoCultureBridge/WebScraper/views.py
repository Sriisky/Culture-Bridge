from django.http import JsonResponse
from .scraper import get_courses, get_events  # Functions i'll create in scraper_utils.py

def courses_view(request):
    url = request.GET.get('url')
    if not url:
        return JsonResponse({'error': 'URL parameter is missing'})

    courses = get_courses(url)  # Use the scraper to get course data
    return JsonResponse({'courses': courses})

def events_view(request):
    url = request.GET.get('url')
    uniName = request.GET.get('uniName')  # Extracting uniName parameter
    if not url or not uniName:
        return JsonResponse({'error': 'URL or uniName parameter is missing'})

    events = get_events(url, uniName)  # Passing uniName to the function
    return JsonResponse({'events': events})