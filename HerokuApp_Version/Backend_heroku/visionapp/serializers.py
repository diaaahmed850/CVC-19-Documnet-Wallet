from django.contrib.auth.models import User
from rest_framework import serializers
from .models import documentModel,SocialUsers

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('password', 'email',)

class documentSerializer(serializers.ModelSerializer):
    class Meta:
        model = documentModel
        fields = '__all__'

class createDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = documentModel
        fields = ('docType','data','title')
class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialUsers
        fields = ('provider','socialID')


class SocialUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email',)