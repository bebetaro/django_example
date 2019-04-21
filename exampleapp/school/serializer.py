from rest_framework import serializers

from school.models import User, Lesson


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "sex", "age")


class LessonSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(), source="user", write_only=True)
    

    class Meta:
        model = Lesson
        fields = ("id", "user", "genre", "date", "hours", "money", "user_id")
