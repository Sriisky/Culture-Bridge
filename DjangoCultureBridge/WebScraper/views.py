from django.http import JsonResponse
from .liveEventsScraper import get_concerts
from .scraper import get_courses, get_events  # Functions i'll create in scraper_utils.py

def courses_view(request):
    url = request.GET.get('url')
    uniName = request.GET.get('uniName')  # Extracting uniName parameter
    if not url or not uniName:
        return JsonResponse({'error': 'URL or Uniname parameter is missing'})

    courses = get_courses(url, uniName)  # Use the scraper to get course data
    return JsonResponse({'courses': courses})

def events_view(request):
    url = request.GET.get('url')
    uniName = request.GET.get('uniName')  # Extracting uniName parameter
    if not url or not uniName:
        return JsonResponse({'error': 'URL or uniName parameter is missing'})

    events = get_events(url, uniName)  # Passing uniName to the function
    return JsonResponse({'events': events})

def concerts_view(request):
    url = request.GET.get('url')
    countryCode = request.GET.get('countryCode')
    if not url or not countryCode:
        return JsonResponse({'error': 'URL or country code parameter is missing'})

    concerts = get_concerts(url, countryCode)  # Passing uniName to the function
    return JsonResponse({'concerts': concerts})