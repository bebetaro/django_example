from rest_framework import serializers

from .models import User, Lesson


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "sex", "age")


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ("user", "genre", "date", "hours")
