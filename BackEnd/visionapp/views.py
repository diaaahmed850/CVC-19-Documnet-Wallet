
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import documentModel,SocialUsers
from .serializers import UsersSerializer,documentSerializer,createDocumentSerializer,SocialSerializer,SocialUsersSerializer
#from rest_framework_jwt.settings import api_settings #for obtaining the custom defined JSON encoder/decoder
from django.http import Http404
from django.conf import settings #for getting the current season
from django.shortcuts import render,get_object_or_404


from rest_framework_jwt.settings import api_settings # to refer to the custom JWT payload encoder/decoder defined # for status code values (200:OK , 404:not found , ...)   #to return content that can be rendered into multiple content types, depending on the client request
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from jwt import DecodeError  

import base64
from PIL import Image
import cv2
import numpy as np
from imutils.object_detection import non_max_suppression
from skimage.filters import threshold_local
import pytesseract
import imutils
import io
import os
import re




 