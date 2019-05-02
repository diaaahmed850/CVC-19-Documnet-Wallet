from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
import json

types=[(0,'ID'),(1,'Passport'),(2,'Other')]
providers = [('facebook', 'Facebook'), ('google', 'Google')]

class jsonFieldHelper(JSONField):
    def from_db_value(self,value,expression,connection,context):
        if isinstance(value,str):
            return json.loads(value)
        return value

class documentModel(models.Model):
    title=models.CharField(default="other",max_length=255)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    docType=models.SmallIntegerField(default=2, choices=types)
    data=jsonFieldHelper()
    
class SocialUsers(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    provider = models.CharField(max_length=8, choices=providers)
    socialID = models.CharField(max_length=100)