from rest_framework import routers
from school.views import UserViewSet, LessonViewSet, ClaimViewSet

router = routers.DefaultRouter()

# When need edit, add id after user or lesson then put request
# (e.g.) user/1 and put json request
router.register(r"user", UserViewSet, "user_route")
router.register(r"lesson", LessonViewSet, "lesson_route")
router.register(r"claim", ClaimViewSet, "claim_route")
