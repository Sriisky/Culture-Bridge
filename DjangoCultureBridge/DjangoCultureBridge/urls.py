"""DjangoCultureBridge URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from RecommenderSystem.views import (
    SongRecommenderView, 
    CityRecommenderView, 
    EventRecommenderView, 
    UniversityRecommenderView
)
from WebScraper.views import (
    courses_view, 
    events_view,
    concerts_view
)
from SpotifyAPI.views import PlaylistView
from EuropeanaAPI.views import MuseumView
from TicketmasterAPI.views import EventsView
from CityReviews.views import ReviewsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/song-recommender/', SongRecommenderView.as_view(), name='song-recommender'),
    path('api/city-recommender/', CityRecommenderView.as_view(), name='city-recommender'),
    path('api/event-recommender/', EventRecommenderView.as_view(), name='event-recommender'),
    path('api/university-recommender/', UniversityRecommenderView.as_view(), name='university-recommender'),
    path('courses/', courses_view, name='get_courses'),
    path('events/', events_view, name='get_events'),
    path('concerts/', concerts_view, name='get_concerts'),
    path('api/authenticate/', PlaylistView.as_view(), name='authenticate'),
    path('api/search_europeana/', MuseumView.as_view(), name='search_europeana'),
    path('api/get_live_events/', EventsView.as_view(), name='get_live_events'),
    path('api/get_reviews/', ReviewsView.as_view(), name='get_reviews'),
    path('api/save_reviews/', ReviewsView.as_view(), name='save_reviews'),
]
