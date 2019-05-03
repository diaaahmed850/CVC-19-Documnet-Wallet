import numpy as np
import cv2
from autocorrect import spell

def order_points(pts):
    rect = np.zeros((4, 2), dtype = "float32")
    s = pts.sum(axis = 1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis = 1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype = "float32")

    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))

    return warped


def increase_brightness(img, value=50):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)

    lim = 255 - value
    v[v > lim] = 255
    v[v <= lim] += value

    final_hsv = cv2.merge((h, s, v))
    img = cv2.cvtColor(final_hsv, cv2.COLOR_HSV2BGR)
    return img

def ChangeDate(date):
    if len(date) != 6:
        return None
    else:
        if 30 <= int(date[:2])<=99:
            year = "19"+date[:2]
        else:
            year = "20"+date[:2]
        return date[4:6]+"/"+date[2:4]+"/"+year

def CorrectDate(Date):
    DateList = list(Date)
    for char in range(len(DateList)):
        if DateList[char].isdigit() and DateList[char+1].isdigit() and char+5 < len(DateList):
            DateList[char+2] = "/"
            DateList[char+5] = "/"
            break
    DateList = "".join(DateList)
    return DateList

def process(text):
    result = ""
    for word in text.split():
        result = result + spell(word) + " "

    return result    
    



def DetectTextBox(input_image):
    img = input_image
    image_final = input_image
    img2gray = img
    ret, mask = cv2.threshold(img2gray, 180, 255, cv2.THRESH_BINARY)
    image_final = cv2.bitwise_and(img2gray, img2gray, mask=mask)
    ret, new_img = cv2.threshold(image_final, 180, 255, cv2.THRESH_BINARY_INV)  # for black text , cv.THRESH_BINARY_INV
    '''
            line  8 to 12  : Remove noisy portion 
    '''
#        kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3,3))  # to manipulate the orientation of dilution , large x #meansorizonatally dilating  more, large y means vertically dilating more
    dilated = cv2.dilate(new_img, kernel, iterations=10)  # dilate , more the iteration more the dilation
    _, contours, hierarchy = cv2.findContours(dilated, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)  
    
    i = 0
    cropped_images = []
    #plt.imshow(dilated)
    for contour in contours:
        # get rectangle bounding contour
        [x, y, w, h] = cv2.boundingRect(contour)

        # Don't plot small false positives that aren't text
        if w < 35 and h < 35:
            continue
            
        if w > 650 and h > 350:
            continue
        
        if w > 11*h or h > 11*w:
            continue

        # draw rectangle around contour on original image
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 0), 10)
        i+=1
        
        #you can crop image and send to OCR  , false detected will return no text :)
        cropped = image_final[y :y +  h , x : x + w]
        cropped_images.append(cropped)
    #plt.imshow(img)
    return cropped_images
