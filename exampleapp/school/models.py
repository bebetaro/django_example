from django.db import models

# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    sex = models.CharField(max_length=5)
    age = models.IntegerField()

    def __repr__(self):
        # 主キーとnameを表示させて見やすくする
        # ex) 1: Alice
        return "{}: {}".format(self.id, self.name)

    __str__ = __repr__  # __str__にも同じ関数を適用


class Lesson(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    genre = models.CharField(max_length=10)
    date = models.DateField()
    hours = models.IntegerField()
    money = models.IntegerField()

    def __str__(self):
        return self.genre
