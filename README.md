# Computer Vision Project

Document Wallet (Ma7fazti) is a cross-platform application that allow the user to scan different types of documents/cards images, extract information from them, and keep such data on his personal account for later usage.

The application is a participation in [CVC'19 competition](http://ihub.asu.edu.eg/cvc19.html) and it's totally developed by a 4th Year Computer and Systems department tea, at Facuty of Engineering Ain Shams University whose members are:
- [Diaa Ahmed](https://github.com/diaaahmed850)
- [Abdallah Reda](https://github.com/AbdallahReda)
- [Abdelrahman Mahmoud](https://github.com/AbdulrahmanMahmoud13)
- [Abdelrahman Yassin](https://github.com/AbdelrahmanYassin)

The application support scanning important documents like:
- Egyptian National ID
- Egyptian Car licence
- WorldWide Passport
- English Business cards
    
The scanning process consists of two main steps:

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
- Supported OS : Linux/UNIX and MacOS
- Requreid packages and libraries found in [requirements.txt](https://github.com/diaaahmed850/Vision19/blob/master/requirements.txt) file
```
pip install -r requirements.txt
```
