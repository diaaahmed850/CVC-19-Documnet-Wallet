"""visionproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from visionapp import views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('doc', views.documentView.as_view()),
    path('doc/<int:pk>', views.documentDetailView.as_view()),
    path('signup', views.EmailSignUpView.as_view()),
    path('signin', views.EmailSignInView.as_view()),
    path('socialLogin', views.SocialLogin.as_view()),
    path('id', views.IDView.as_view()),
    path('passport', views.PassportView.as_view()),
    path('licence', views.LicenceView.as_view()),
    path('fines', views.LicenceFinesView.as_view()),

]
