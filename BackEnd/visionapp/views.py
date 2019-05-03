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
from .Natinal_ID.NatinalID import *
from .Passport.Passport import *
from .Licence.Licence import *
num1=0
num2=0
def stringToRGB(base64_string,type):
    global num1
    imgdata = base64.b64decode(str(base64_string))
    image = Image.open(io.BytesIO(imgdata))
    if type=='i':
        image.save('test_data_ID/test'+str(num1)+'.jpg')
    elif type =='p':
        image.save('test_data_passport/test'+str(num2)+'.jpg')
    
    num1=num1+1
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)

class IDView(APIView):    
    def post(self,request):
        try:
            imgstring=request.data['img']
            img=stringToRGB(imgstring,'i')
            res=IDScanner(img)
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Please Provide a good match national ID"}, status=status.HTTP_406_NOT_ACCEPTABLE)


class PassportView(APIView):
    def post(self,request):
        try:
            imgstring=request.data['img']
            img=stringToRGB(imgstring,'i')
            res=PassportScanner(img)
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Please Provide a good match Passport"}, status=status.HTTP_406_NOT_ACCEPTABLE)

class LicenceView(APIView):
    def post(self,request):
        try:
            imgstring=request.data['img']
            img=stringToRGB(imgstring,'i')
            res=LicenseScanner(img)
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Please Provide a good match Licence"}, status=status.HTTP_406_NOT_ACCEPTABLE)



class documentView(APIView):
    def get(self,request):
        try:
            # getting the token from the http request as (bearer token)
            token = request.META.get('HTTP_AUTHORIZATION', '')
            # get the token part only
            token = token.split(" ")[1]
            # get jwt decode function to be used to decode the token
            jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        except:
            # error occures when the user doesn't send a token in the request so he is not authorized
            return Response({"error": "2-user isn't authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                # decode the token and get the payload from the token
                token_info = jwt_decode_handler(token)  # decrypting the token
            except:
                # error occures when the token is not valid
                return Response({"error": "token can't be decrypted"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                # getting user from the email sent in token
                user = User.objects.get(email=token_info["email"])
                id = user.id
                try:
                    data = documentModel.objects.filter(user=id)
                except Exception as e:
                    return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    serializer = documentSerializer(data,many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self,request):
        try:
            # getting the token from the http request as (bearer token)
            token = request.META.get('HTTP_AUTHORIZATION', '')
            # get the token part only
            token = token.split(" ")[1]
            # get jwt decode function to be used to decode the token
            jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        except:
            # error occures when the user doesn't send a token in the request so he is not authorized
            return Response({"error": "2-user isn't authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                # decode the token and get the payload from the token
                token_info = jwt_decode_handler(token)  # decrypting the token
            except:
                # error occures when the token is not valid
                return Response({"error": "token can't be decrypted"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                # getting user from the email sent in token
                user = User.objects.get(email=token_info["email"])
                serializer = createDocumentSerializer(data=request.data)
                if serializer.is_valid():
                    try:
                        doc = documentModel.objects.create(
                            user=user,
                            docType=serializer.validated_data["docType"],
                            data=serializer.validated_data["data"],
                            title=serializer.validated_data["title"],
                             )
                        doc.save()
                        return Response({"done": "eshta"}, status=status.HTTP_201_CREATED)
                    except Exception as e:
                        return Response({"error": "data corrupted"}, status=status.HTTP_406_NOT_ACCEPTABLE)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class documentDetailView(APIView):
    def get(self,request,pk):
        try:
            # getting the token from the http request as (bearer token)
            token = request.META.get('HTTP_AUTHORIZATION', '')
            # get the token part only
            token = token.split(" ")[1]
            # get jwt decode function to be used to decode the token
            jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        except:
            # error occures when the user doesn't send a token in the request so he is not authorized
            return Response({"error": "2-user isn't authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                # decode the token and get the payload from the token
                token_info = jwt_decode_handler(token)  # decrypting the token
            except:
                # error occures when the token is not valid
                return Response({"error": "token can't be decrypted"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                # getting user from the email sent in token
                user = User.objects.get(email=token_info["email"])
                id = user.id
                try:
                    data = documentModel.objects.filter(user=id).get(id=pk)
                except Exception as e:
                    return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    serializer = documentSerializer(data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request, pk):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', '') # getting the token from the http request
            token = token.split(" ")[1]
            jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        except :
            return Response({"error": "2-user isn't authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                token_info = jwt_decode_handler(token) #decrypting the token
            except :
                return Response({"error": "token can't be decrypted"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                user = User.objects.get(email=token_info["email"]) # getting user from the email sent in token
                id=user.id

                #serializer = documentSerializer(user,data=request.data)
                
                try:
                    document=documentModel.objects.filter(user=id).get(id=pk)
                except Exception as e:
                    print(e)
                    return Response({"error":"Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    serializer = createDocumentSerializer(document,data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', '') # getting the token from the http request
            token = token.split(" ")[1]
            jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        except :
            return Response({"error": "2-user isn't authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                token_info = jwt_decode_handler(token) #decrypting the token
            except :
                return Response({"error": "token can't be decrypted"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                user = User.objects.get(email=token_info["email"]) # getting user from the email sent in token
                id=user.id

                #serializer = documentSerializer(user,data=request.data)
                
                try:
                    document=documentModel.objects.filter(user=id).get(id=pk)
                except Exception as e:
                    print(e)
                    return Response({"error":"Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    document.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)


class EmailSignUpView(APIView):
    
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.validated_data["email"]
                serializer.validated_data["password"]
                #stayLoggedin value doesn't exist in the user model provided by Django so it is checked here for the token generation
                 
            except KeyError:
                return Response({"error": "Some data is missing"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                User.objects.get(email=serializer.validated_data["email"])
            except User.DoesNotExist:
                try:
                    user = User.objects.create_user(username=serializer.validated_data["email"],email=serializer.validated_data["email"],password=serializer.validated_data["password"])

                except Exception as e:
                    return Response({"error": "Please try again later"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                #generate token for the created User.
                jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                
                return Response({"token": token}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "The Email Already Exists!"}, status=status.HTTP_401_UNAUTHORIZED)
                
                try:
                    #check if the email entered as a social user email that already exist 
                    SocialUsers.objects.get(user=User.objects.get(email=serializer.validated_data["email"]))
                except SocialUsers.DoesNotExist:
                    #No IT DOESN'T EXIST AS A SOCIAL ACCOUNT , BUT IT EXISTS AS A NORMAL ACCOUNT 
                    return Response({"error": "The Email Already Exists!"}, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    #YES IT EXISTS AS A SOCIAL ACCOUNT
                    return Response({"error": "The Email exist as a social account"},status=status.HTTP_401_UNAUTHORIZED)
                
        else:
            #ERRORS WITH SUBMITTED DATA
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

class EmailSignInView(APIView):
    
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.validated_data["email"]
                serializer.validated_data["password"]
            except KeyError:
                return Response({"error": "Some data is missing"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                user = User.objects.get(username=serializer.validated_data["email"])
            except User.DoesNotExist:
                return Response({"Error": "Please Sign up first","error": "Email/Password is incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                #sign in to the system
                if authenticate(username=user.username,password=serializer.validated_data["password"]):
                    #Generate the user JWT and return it to the front to be logged in
                    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
                    payload = jwt_payload_handler(user)
                    token = jwt_encode_handler(payload)
                    return Response({"token": token}, status=status.HTTP_201_CREATED)
                else:
                    #not a normal user , then check the social user table
                    return Response({"Error": "Password provided is wrong","error": "Email/Password is incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
                    
                    try:
                        SocialUsers.objects.get(user=user)
                    except SocialUsers.DoesNotExist:
                        #no , then there is something wrong with the data inserted.
                        return Response({"Error": "Password provided is wrong","error": "Email/Password is incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
                    else:
                        #yes exist as a social user , can't login
                        return Response({"error": "The Email exist as a social account, login using your social account"},status=status.HTTP_401_UNAUTHORIZED)
        else:       
            #Invalid data inserted
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class SocialLogin(APIView):
    
    def post(self, request):
        social_serializer = SocialSerializer(data=request.data)
        social_serializer_email = SocialUsersSerializer(data=request.data)
        if social_serializer_email.is_valid() and social_serializer.is_valid():
            try:
                social_serializer_email.validated_data["email"]
            except KeyError:
                return Response({"error": "Some data is missing"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                #1)checking whether the account already exists as a SOCIAL USER or not ?
                SocialUsers.objects.get(socialID=social_serializer.validated_data["socialID"])
            except SocialUsers.DoesNotExist:
                #1.1)No it doesn't exist as a socialUser , then check the normal user table 
                try:
                    User.objects.get(email=social_serializer_email.validated_data["email"])
                except User.DoesNotExist:
                    try:
                        #1.1.1) not Found in any of the 2 tables (SocialUsers and User), then add this Social Account
                        user = User.objects.create_user(username=social_serializer_email.validated_data["email"],email=social_serializer_email.validated_data["email"])
                        social_serializer.save(user=user)
                    except Exception as e:
                        return Response({"error": "Please try again later","content":str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
                    payload = jwt_payload_handler(user)
                    token = jwt_encode_handler(payload)
                    return Response({"token": token}, status=status.HTTP_201_CREATED)
                else:
                    #1.1.2) exists as a normal user account, so won't be created again
                    return Response({"error": "The Account Already Exists, you should login using your Email"},status=status.HTTP_401_UNAUTHORIZED)
            else:
                #1.2)YES that account already exist so, won't created again.
                socialUser=SocialUsers.objects.get(socialID=social_serializer.validated_data["socialID"])
                jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
                payload = jwt_payload_handler(socialUser.user)
                token = jwt_encode_handler(payload)
                return Response({"token": token}, status=status.HTTP_201_CREATED)

        else:
            #collect errors in data submitted to be sent to client side.
            social_serializer_email.is_valid()
            social_serializer.is_valid()
            errors = social_serializer.errors
            errors.update(social_serializer_email.errors)
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

# Class that contain the apis for signning in using Facebook/Google Account
# HTTP methods to interact : POST request in which the user sign in using Facebook/Google account




