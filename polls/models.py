from django.db import models
import json

# Create your models here.


class MessageFromSpace(models.Model):
    date = models.DateTimeField('date received')
    text = models.CharField(max_length=500)
    read = models.BooleanField(default=False)

    def __str__(self):
        return self.text
