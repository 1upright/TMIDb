from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator

from .models import Movie, Review
from .serializers.review import ReviewSerializer
from .serializers.movie import MovieSerializer

# Create your views here.
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@api_view(['POST'])
def review_create(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=user)
        
        reviews = movie.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'DELETE'])
def review_update_or_delete(request, movie_pk, review_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = get_object_or_404(Review, pk=review_pk)

    def update_review():
        if request.user == review.user:
            serializer = ReviewSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                reviews = movie.reviews.all()
                serializer = ReviewSerializer(reviews, many=True)
                return Response(serializer.data)

    def delete_review():
        if request.user == review.user:
            review.delete()
            reviews = movie.reviews.all()
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_review()
    elif request.method == 'DELETE':
        return delete_review()

@api_view(['POST'])
def like_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        movie.like_users.add(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

@api_view(['GET'])
def search(request, keyword):
    movies = Movie.objects.all()
    def insert_whitespace(keyword):
        s = []
        for i in range(len(keyword)):
            s.append(keyword[i:i+1])
        return '\s*'.join(s)
    if keyword:
        movies = movies.filter(korean_title__iregex=insert_whitespace(keyword))
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def recommendation(request):
    import heapq
    movies = Movie.objects.all()
    user = request.user
    results = []
    for movie in movies:
        imdb_rating = movie.imdb_rating
        mc_rating = movie.mc_rating
        rt_rating = movie.rt_rating

        naver_rating = movie.naver_rating
        naver_count = movie.naver_count
        watcha_rating = movie.watcha_rating * 2.3
        watcha_count = int(movie.watcha_count.replace('???', '0000').replace(',', '').replace('???', ''))/100

        user_or_critic = user.user_or_critic
        foreign_or_domestic = user.foreign_or_domestic

        critic_rating = (mc_rating + rt_rating) / 20
        user_or_critic_rating = imdb_rating*(10-user_or_critic) + critic_rating*user_or_critic

        domestic_rating = (naver_rating*naver_count + watcha_rating*watcha_count) / (naver_count+watcha_count)
        foreign_or_domestic_rating = imdb_rating*(10-foreign_or_domestic) + domestic_rating*foreign_or_domestic

        result_value = user_or_critic_rating + foreign_or_domestic_rating
        heapq.heappush(results, (-result_value, movie))

    recommended_movies = []
    for _ in range(10):
        num, movie = heapq.heappop(results)
        recommended_movies.append(movie)
    
    serializer = MovieSerializer(recommended_movies, many=True)
    return Response(serializer.data)