# from django.shortcuts import render

# import django_filters
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .models import User, Lesson
from .serializer import UserSerializer, LessonSerializer


class UserAPI(APIView):
    def get(self, request, format=None):
        user = User.objects.get(name=request.data.name)
        serilizer = UserSerializer(user)
        return Response(serilizer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        user = User.objects.get(name=request.data.name)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LessonAPI(APIView):
    def get(self, request, format=None):
        lesson = Lesson.objects.get(name=request.data.name)
        serilizer = LessonSerializer(lesson)
        return Response(serilizer.data)

    def post(self, request, format=None):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        lesson = Lesson.objects.get(name=request.data.name)
        serializer = UserSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
