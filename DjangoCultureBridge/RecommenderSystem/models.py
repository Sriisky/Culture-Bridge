from django.db import models

# Create your models here.
class React(models.Model):
    song = models.CharField(max_length=50)
    eventType =  models.CharField(max_length=50)
    population = models.IntegerField()
    courseName = models.CharField(max_length=50)
    