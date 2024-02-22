from django.http import JsonResponse
from .reviewProcess import get_reviews, save_reviews
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ReviewsView(APIView):
    def get(self, request):
        uniName = request.GET.get('uniName')
        if not uniName:
            return JsonResponse({'error': 'Uniname parameter is missing'})

        reviews = get_reviews(uniName)
        return JsonResponse({'reviews': reviews})

    def post(self, request):
        data = request.data
        review = data.get('review')
        uniName = data.get('uniName')

        if not review or not uniName:
            return JsonResponse({'error': 'Review or Uniname parameter is missing'})

        save_reviews(review, uniName)
        return JsonResponse({'success': True})
