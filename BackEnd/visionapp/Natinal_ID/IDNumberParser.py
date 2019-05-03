from datetime import datetime
from dateutil import relativedelta

def getDate(id):
    """
    Internal function
    """
    M = id[3:5]
    D = id[5:7]
    if id[0]=="2":
        Y=str(19)+id[1:3]
    if id[0]=="3":
        Y=str(20)+id[1:3]
    year = str(Y)
    month = str(M)
    day = str(D)
    return year,month,day


def getDateOfBirth(id):
    """
    return format string "yyy/mm/dd"
    """
    y,m,d=getDate(id)
    return(y+'/'+m+'/'+d)


def getDateOfRetirement(id):
    """
    return format string "yyy/mm/dd"
    """
    yearOfTheYear = datetime.today().strftime("%Y")   
    y,m,d=getDate(id)
    difference = int(yearOfTheYear) - int(y)
    
    if not difference >60 :
        Y=int(y)+60
    else:
        return "OnRetirementAge"
    
    return(str(Y)+'/'+m+'/'+d)


def getGovName(id):

    govCods={    
        "01":"القاهرة",
        "02":"الإسكندرية",
        "03":"بورسعيد",
        "04":"السويس",
        "11":"دمياط",
        "12":"الدقهلية",
        "13":"الشرقية",
        "14":"القليوبية",
        "15":"كفر الشيخ",
        "16":"الغربية",
        "17":"المنوفية",
        "18":"البحيرة",
        "19":"الإسماعيلية",
        "21":"الجيزة",
        "22":"بني سويف",
        "23":"الفيوم",
        "24":"المنيا",
        "25":"أسيوط",
        "26":"سوهاج",
        "27":"قنا",
        "28":"أسوان",
        "29":"الأقصر",
        "31":"البحر الأحمر",
        "32":"الوادى الجديد",
        "33":"مطروح",
        "34":"شمال سيناء",
        "35":"جنوب سيناء",
        "88":"خارج الجمهورية"}
    return govCods[id[7:9]],id[7:9]

def getGender(id):
    
    if int(id[12:13])%2==0:
        return "Female"
    else:
        return "Male"