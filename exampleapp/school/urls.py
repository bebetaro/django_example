from django.urls import path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserAPI, LessonAPI

router = routers.DefaultRouter()

urlpatterns = [
    path("", router.as_view()),
    path("user/", UserAPI.as_view()),
    path("user/<int:id>/", UserAPI.as_view()),
    path("lesson/", LessonAPI.as_view()),
    path("lesson/<int:id>/", LessonAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
