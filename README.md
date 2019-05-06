# CVC'19 Documnet Wallet

Document Wallet (Ma7fazti) is a cross-platform application that allow the user to scan different types of documents/cards images, extract information from them, and keep such data on his personal account for later usage.

The application is a participation in [CVC'19 competition](http://ihub.asu.edu.eg/cvc19.html) and it's totally developed by a 4th Year Computer and Systems department team, at Facuty of Engineering Ain Shams University.

The Team name isX-Team and his members are:
- [Diaa Ahmed](https://github.com/diaaahmed850)
- [Abdallah Reda](https://github.com/AbdallahReda)
- [Abdelrahman Yassin](https://github.com/AbdelrahmanYassin)
- [Abdelrahman Mahmoud](https://github.com/AbdulrahmanMahmoud13)

The application developed using Ionic Cross-Platform framework:
- Backend implemented using Python OpenCV library for computer vision 
- Frontend implemented using Node and Django
#### Youtube demo for application functions and testing can be found [here](https://youtu.be/Ft0mwggR25U) 

## Application Features
- A smart SignUP/Login system which allow the user to Sinup/Login with his direct email address or using social login (Facebook and Google+).

- A smart modification system that allow the user to delete/modify the existing data.

- Support scanning important documents like:
    - Egyptian National ID
    - Egyptian Car licence
    - WorldWide Passport
    - English Business cards

## Scanning and Text Extracting
- The scanning process consists of two main steps:
    - Document(card) detection from the image provided to the application using SIFT(scale invariant feature transform) algorithm.
    - In case of national ID,Passport and licence we are providing to the algorithm a reference image for each type of the previous documents in order to be able to detect the document from the given image.this approach consists of the following steps:
        - Providing a reference image to SIFT algorithm.
        - Calculating the matches between the input image and the reference image,then we will be able to get place of the card in the image .
        - Apply four-point transform to get the detected card .
        
    - In case of business card we don’t have a specific reference image so we used another approach to detect the business card from the image which consists from the following steps:
        - Applying canny edge detection to get the Edges in the image.
        - Finding the contours in the edged image.
        - Apply four-point transform to get the detected card .

- Text recognition: in this step we take the detected card from the image and start to apply some enhancements to the detected document,then we cut the region of interests in the detected card that contain the the information we need to in order to recognize the text in it,then provide these ROI(region of interest) to the pytessarct to get the recognized text.


## Installation
- Supported OS : Windows10, Linux/UNIX and MacOS
- Required IDEs:
    - Android Studio for SDK android building
    - Xcode for IPA ios buidling (MacOS on Apple device is required)
- Requreid packages and libraries found in [requirements.txt](https://github.com/diaaahmed850/Vision19/blob/master/requirements.txt) file
```
$ pip install -r requirements.txt
```

### Development
- Open Command/Terminal Window to get your device local address and clone the repo
```
$ ip addr show
$ git clone https://github.com/diaaahmed850/Vision19
$ cd Vision19
```
- Navigate to  BackEnd folder 
```
$ cd BackEnd
```
- Run manage file passing it your ip-address
```
$ python manage.py runserver ip-address:8000
```
- Open Another Terminal Vision19 folder and navigate to MobileApp folder
```
$ cd MobileApp
```
- Install node 
```
$ npm install
```
- Run the application on local server
```
$ ionic serve  -c
```
- Run on [Ionic DevApp](https://ionicframework.com/docs/appflow/devapp) easily by installing it on your smartphone and openit trying to connect to your running server by following the steps shown inside the DevApp mobile application


### Building for source app
- For Android production release:
```sh
$ ionic cordova platform add android 
$ ionic cordova run android
```
- For IOS production release:
```sh
$ ionic cordova platform add ios 
$ ionic cordova run ios
```
- For More clear steps on building the ionic application , please visit https://ionicframework.com/docs/building/running
