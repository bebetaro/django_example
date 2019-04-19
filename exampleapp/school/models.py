from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=100)
    sex = models.CharField(max_length=1)
    age = models.IntegerField()


class Lesson(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    genre = models.CharField(max_length=10)
    date = models.DateField()
    hours = models.IntegerField()
