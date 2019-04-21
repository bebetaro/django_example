from rest_framework import viewsets, status
from django.http import QueryDict
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django.db.models import Sum, Count
#from django.http import Http404
from rest_framework.decorators import action
from school.models import User, Lesson
from school.serializer import UserSerializer, LessonSerializer


class ClaimFilter(filters.FilterSet):

    month = filters.NumberFilter(
        field_name="date", lookup_expr="month")

    class Meta:
        model = Lesson
        fields = ["month"]


def calcPrice(hours, genre):
    if genre == "英語":
        money = 5000 + hours*3500
    elif genre == "ファイナンス":
        if hours > 50:
            money = 3300*20 + 2800*30 + (hours-50)*2500
        elif hours > 20:
            money = 3300*20 + (hours-20)*2800
        else:
            money = 3300*hours
    else:
        if hours > 50:
            money = 20000 + 15*3500 + 15*3000 + 15*2800 + (hours-50)*2500
        elif hours > 35:
            money = 20000 + 15*3500 + 15*3000 + (hours-35)*2800
        elif hours > 20:
            money = 20000 + 15*3500 + (hours-20)*3000
        else:
            if hours < 5:
                hours = 0
            else:
                hours -= 5
            money = 20000 + 3500 * hours
    return money


class UserViewSet(viewsets.ModelViewSet):
    """REST API for User"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    """Page for edit user information"""


class ClaimViewSet(viewsets.ViewSet):

    def list(self, request):

        month = self.request.query_params.get("month", None)
        queryset = Lesson.objects.filter(date__month=month)
        #count = queryset.values("user_id").annotate(genre="genre")
        user_info = queryset.values("user").annotate(
            count=Count("id"), genre=Count("genre", distinct=True))
        eng_count = queryset.filter(genre="英語").values(
            "user").annotate(hours=Sum("hours"))
        prog_count = queryset.filter(genre="プログラミング").values(
            "user").annotate(hours=Sum("hours"))
        fin_count = queryset.filter(genre="ファイナンス").values(
            "user").annotate(hours=Sum("hours"))
        #print(eng_count, prog_count, fin_count)

        for k in user_info:
            k["eng_hours"] = 0
            k["prog_hours"] = 0
            k["fin_hours"] = 0

        for i in eng_count:
            e_user = i.get("user")
            for j in user_info:
                u_user = j.get("user")

                if e_user == u_user:
                    hours = i.get("hours")
                    j["eng_hours"] = hours
                    genre = str(j.get("genre"))
                    j["genre"] = genre+","+"英語"

        for i in prog_count:
            e_user = i.get("user")
            for j in user_info:
                u_user = j.get("user")

                if e_user == u_user:
                    hours = i.get("hours")
                    j["prog_hours"] = hours
                    genre = str(j.get("genre"))
                    j["genre"] = genre+","+"プログラミング"

        for i in fin_count:
            e_user = i.get("user")
            for j in user_info:
                u_user = j.get("user")

                if e_user == u_user:
                    hours = i.get("hours")
                    j["fin_hours"] = hours
                    genre = str(j.get("genre"))
                    j["genre"] = genre+","+"ファイナンス"
        for l in user_info:
            price = 0
            eng = l.get("eng_hours")
            if eng > 0:
                price += calcPrice(eng, "英語")
            prog = l.get("prog_hours")
            if prog > 0:
                price += calcPrice(prog, "プログラミング")
            fin = l.get("fin_hours")
            if fin > 0:
                price += calcPrice(fin, "ファイナンス")

            l["price"] = price

        #merged = {"eng": eng_count, "prog": prog_count, "fin": fin_count}
        # print(merged)

        # print(count)
        #queryset.query.group_by = ["user.id"]
        #serializer = LessonSerializer(user_info, many=True)
        return Response(user_info, status=status.HTTP_200_OK)
        # return Response(serializer.data, status=status.HTTP_200_OK)


class LessonViewSet(viewsets.ModelViewSet):
    """REST API for Lesson"""
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def create(self, request):
        req_dict = request.data.copy()
        hours = int(req_dict.get("hours"))
        genre = req_dict.get("genre")
        money = calcPrice(hours, genre)
        req_dict["money"] = str(money)
        serializer = LessonSerializer(data=req_dict)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        lesson = Lesson.objects.get(id=pk)
        req_dict = request.data.copy()
        hours = int(req_dict.get("hours"))
        genre = req_dict.get("genre")
        money = calcPrice(hours, genre)
        req_dict["money"] = str(money)
        serializer = LessonSerializer(lesson, data=req_dict)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """Page for edit lesson information"""


"""
    @action(detail=True, methods=["put"])
    def edit(self, request, pk):
        lesson = Lesson.objects.get(id=request.data.id)
        serializer = LessonSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()


        #serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LessonAPI(APIView):
    def get(self, request, format=None):
        lesson = Lesson.objects.all()
        #serilizer = LessonSerializer(lesson)
        return Response(serilizer.data)

    def post(self, request, format=None):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        lesson = Lesson.objects.get(pk=id)
        serializer = UserSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
"""
    @action(detail=True, methods=["put"])
    def edit(self, request, pk):
        user = User.objects.get(id=request.data.id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        #serializer = UserSerializer(user, data=request.data)
    
    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



    def get(self, request, format=None):
        user = User.objects.all()
        serilizer = UserSerializer(user)
        return Response(serilizer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""

# Create your views here.
