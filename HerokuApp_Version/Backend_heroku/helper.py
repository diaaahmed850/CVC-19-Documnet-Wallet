import numpy as np
import cv2
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
    if 30 <= int(date[:2])<=99:
        year = "19"+date[:2]
    else:
        year = "20"+date[:2]
    
    return date[4:6]+"/"+date[2:4]+"/"+year


def Parser(upper, lower):
    len_upper, len_lower = len(upper), len(lower)

    surname_names = upper[5:44].split('<<', 1)

    if len(surname_names) < 2:
        surname_names += ['']
    
    surname, names = surname_names
    type_ = upper[0:2]
    country = upper[2:5]
    names = names.replace('<', ' ').strip()
    surname = surname.replace('<', ' ').strip()
    number = lower[0:9]
    check_number = lower[9]
    nationality = lower[10:13]
    date_of_birth = ChangeDate(lower[13:19])
    check_date_of_birth = lower[19]
    sex = lower[20]
    expiration_date = ChangeDate(lower[21:27])
    check_expiration_date = lower[27]
    personal_number = lower[28:42]
    valid_line_lengths = [len_upper == 44, len_lower == 28]
    valid_misc = [upper[0] in 'P']
    if sex=="M": sex = "Male"
    if sex=="F": sex = "Female"
    result={
        "Nationality":nationality,
        "Name":names+" "+surname,
        "Passport_No":number,
        "Country":country,
        "Sex":sex,
        "Date_of_Birth":date_of_birth,
        "Expiration_date":expiration_date


    }
   
    return result
