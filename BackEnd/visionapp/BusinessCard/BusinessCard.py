from ..imports_helperfunctions.ImportLib import *
from ..imports_helperfunctions.HelperFunc import *
from .BusinessCardParser import *

def BusinessCutter(InputImage):
    
    image = InputImage
    image = increase_brightness(image, value=40)
    ratio = image.shape[0] / 300.0
    orig = image.copy()
    image = imutils.resize(image,height = 300)
    
    # convert the image to grayscale, blur it, and find edges in the image
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 11, 17, 17)
    edged = cv2.Canny(gray, 50, 200,3)

    kernel = np.ones((4,4),np.uint8)
    kernel_vertical = np.ones((2,1),np.uint8)
    dilate = cv2.dilate(edged,kernel,iterations = 1)
    dilate = cv2.dilate(dilate,kernel_vertical,iterations = 2)

    cnts = cv2.findContours(dilate.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:10]
    screenCnt = None

    # loop over our contours
    for c in cnts:
        # approximate the contour
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.015 * peri, True)
    
        # if our approximated contour has four points, then
        # we can assume that we have found our screen
        if len(approx) == 4:
            screenCnt = approx
            break

    # apply the four point transform to obtain a top-down
    # view of the original image
    warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)
    warped_Gray = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)

    clahe = cv2.createCLAHE(clipLimit=1.0, tileGridSize=(8,8))
    warped_Gray = clahe.apply(warped_Gray)
    warped_Gray = cv2.resize(warped_Gray,(800,450))

    config = ('-l eng --oem 1 --psm 11')
    result = pytesseract.image_to_string(warped_Gray,config=config)
    return result

def ResultParser(result):
    result = result.replace('’',' ')
    result = result.replace('|',' ')
    result = result.replace('(','')
    result = result.replace(')','')
    result_ = result

    result_ = re.sub(r'(\d)\s+(\d)', r'\1\2', result_)
    numbers = re.findall(r'\d\d\d\d\d+', result_)
    #print(numbers)

    name  = []
    phone = []
    email = []

    result = result.splitlines()

    for line in result:
        
        line = line.strip()
        line = ' '.join( [w for w in line.split() if len(w)>2] )
        info = BusinessCardParser()
        contact = info.getContactInfo(line)

        # each value below is a string
        if contact.getName()!=None :
            name.append(contact.getName()) 
            
        if contact.getEmailAddress()!=None :
            email.append(contact.getEmailAddress())  

    for number in numbers:
        numberlist = BusinessCardParser()
        contact = numberlist.getContactInfo(number)
        if contact.getPhoneNumber()!=None :
            phone.append(contact.getPhoneNumber())
            
    if len(name)==0 :
        name = [None] 
            
    if len(phone)==0 :
        phone = [None]
            
    if len(email)==0 :
        email = [None]

    return name,phone,email

def BusinessScanner(InputImage):
    result = BusinessCutter(InputImage)
    Name,Phone,Email = ResultParser(result)
    data={}
    for i in range(len(Name)):
        if i==0:
            data.update({"Name":Name[i]})
        else:
            data.update({"Name" + str(i):Name[i]})
    for i in range(len(Phone)):
        if i==0:
            data.update({"Phone":Phone[i]})
        else:
            data.update({"Phone " + str(i):Phone[i]})
    
    for i in range(len(Email)):
        if i==0:
            data.update({"Email":Email[i]})
        else:
            data.update({"Email " + str(i):Email[i]})
    
    return data
    

