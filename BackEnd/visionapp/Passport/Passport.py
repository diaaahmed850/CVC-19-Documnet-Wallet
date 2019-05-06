from ..imports_helperfunctions.ImportLib import *
from ..imports_helperfunctions.HelperFunc import *

def PassportMatcher(InputImage):
    MIN_MATCH_COUNT = 100
    detector=cv2.xfeatures2d.SIFT_create()

    FLANN_INDEX_KDITREE=0
    flannParam=dict(algorithm=FLANN_INDEX_KDITREE,tree=5)
    flann=cv2.FlannBasedMatcher(flannParam,{})

    trainImg=cv2.imread("Reference_Images/REF_PASSPORT.jpg",0)
    trainKP,trainDesc=detector.detectAndCompute(trainImg,None)

    QueryImgBGR = InputImage
    QueryImgBGR = increase_brightness(QueryImgBGR, value=30)
    
    QueryImg=cv2.cvtColor(QueryImgBGR,cv2.COLOR_BGR2GRAY)
    queryKP,queryDesc = detector.detectAndCompute(QueryImg,None)
    matches           = flann.knnMatch(queryDesc,trainDesc,k=2)
    goodMatch         = []

    for m,n in matches:
        if(m.distance<0.75*n.distance):
            goodMatch.append(m)

    if(len(goodMatch)>MIN_MATCH_COUNT):
        tp=[]
        qp=[]
        for m in goodMatch:
            tp.append(trainKP[m.trainIdx].pt)
            qp.append(queryKP[m.queryIdx].pt)
        tp,qp=np.float32((tp,qp))
        H,status=cv2.findHomography(tp,qp,cv2.RANSAC,3.0)
        h,w=trainImg.shape
        trainBorder=np.float32([[[0,0],[0,h-1],[w-1,h-1],[w-1,0]]])
        queryBorder=cv2.perspectiveTransform(trainBorder,H)
        x_points=[]
        y_points=[]
        for border in queryBorder[0]:
            x_points.append(border[0])
            y_points.append(border[1])

        x_start=int(min(x_points))
        y_start=int(min(y_points))
        x_end=int(max(x_points))
        y_end=int(max(y_points))
        warped=QueryImgBGR[y_start:y_end,x_start:x_end]

    else:
        raise Exception('Not Enough match found,Make sure its an ID card and recapture the image again')

    Edged = four_point_transform(QueryImgBGR, queryBorder.reshape(4, 2))

    return Edged

def PassportCutter(InputImage):
    Kernel_Vertical = np.ones((2,1), np.uint8)
    Kernel_sharpen = np.array([[-1,-1,-1], [-1, 9,-1],[-1,-1,-1]])
    Kernel = np.ones((2,2), np.uint8)

    Edged = PassportMatcher(InputImage)
    EdgedGray = cv2.cvtColor(Edged, cv2.COLOR_BGR2GRAY)
    EdgedR = cv2.resize(EdgedGray,(1600,1100))
    EdgedR = cv2.filter2D(EdgedR, -1, Kernel_sharpen)

    PassNum_IMG = EdgedR[75:140,1162:1450]
    Name_IMG    = EdgedR[225:305,600:1500]
    Name2_IMG   = EdgedR[280:340,600:900]
    DateB_IMG   = EdgedR[315:410,595:835]
    PlaceB_IMG  = EdgedR[305:405,840:1080]
    Nation_IMG  = EdgedR[390:475,595:835]
    Gender_IMG  = EdgedR[420:470,840:950]
    DateI_IMG   = EdgedR[445:540,595:835]
    DateE_IMG   = EdgedR[450:545,835:1090]
    Proff_IMG   = EdgedR[650:735,595:1420]

    #PassNum_IMG=cv2.erode(PassNum_IMG,Kernel,iterations=2)
    _,PassNum_IMG = cv2.threshold(PassNum_IMG,120,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    PassNum_IMG = cv2.morphologyEx(PassNum_IMG, cv2.MORPH_OPEN, Kernel,iterations=2)

    return PassNum_IMG,Name_IMG,Name2_IMG,DateB_IMG,PlaceB_IMG,Nation_IMG,DateI_IMG,DateE_IMG,Proff_IMG

def PassportParser(PassNum_IMG,Name_IMG,Name2_IMG,DateB_IMG,PlaceB_IMG,Nation_IMG,DateI_IMG,DateE_IMG,Proff_IMG):
    
    
    config = '-l eng --oem 1 --psm 6'

    PassNum_text = pytesseract.image_to_string(PassNum_IMG,config=config)
    Name_text = pytesseract.image_to_string(Name_IMG,config=config)
    Name2_text = pytesseract.image_to_string(Name2_IMG,config=config)
    DateB_text = pytesseract.image_to_string(DateB_IMG,config=config)
    PlaceB_text = pytesseract.image_to_string(PlaceB_IMG,config=config)
    Nation_text = pytesseract.image_to_string(Nation_IMG,config=config)
    DateI_text = pytesseract.image_to_string(DateI_IMG,config=config)
    DateE_text = pytesseract.image_to_string(DateE_IMG,config=config)
    Proff_text = pytesseract.image_to_string(Proff_IMG,config=config)

    #ID
    if len(PassNum_text) > 0:
        PassNum_text = re.sub(r'[^\w]', ' ', PassNum_text)
        PassNum_text = PassNum_text.replace(' ', '')
        PassNum_text = " ".join(PassNum_text.split())
        PassNum_text = re.findall('([A-Z]+(?:(?!\s?[0-9][A-Z])\s?[0-9])+)', PassNum_text)
        if len(PassNum_text) != 0:
            PassNum_1 = PassNum_text[0]
        else:
            PassNum_1 = None
    else:
        PassNum_1 = None
    #print(PassNum_1)

    #NAME1
    if len(Name_text) != 0: 
        Name_text = Name_text.replace('\n', ' ')
        Name_text = re.sub(r'[^\w]', ' ', Name_text)
        Name_text = re.sub(r'[0-9]+', '', Name_text)
        Name1Find = re.findall('([A-Z]+(?:(?!\s?[A-Z][a-z])\s?[A-Z])+)', Name_text)
        if len(Name1Find) == 0:
            Name_1 = None
        else:
            if len(Name1Find[0]) > 2:
                Name_1 = Name1Find[0]
                splitted = Name_1.split()
                Name_1 = ""
                for word in range(len(splitted)):
                    if word == 4:
                        break
                    Name_1 += splitted[word] + ' '
            else:
                Name_1 = None
    else:
        Name_1 = None

    #NAME2
    if len(Name2_text) != 0: 
        Name2_text = re.sub(r'[^\w]', ' ', Name2_text)
        Name2_text = re.sub(r'[0-9]+', '', Name2_text)
        Name2Find = re.findall('([A-Z]+(?:(?!\s?[A-Z][a-z])\s?[A-Z])+)', Name2_text)
        if len(Name2Find) == 0:
            Name2_1 = None
        else:
            if len(Name2Find[0]) > 2:
                Name2_1 = Name2Find[0]
            else:
                Name2_1 = None
    else:
        Name2_1 = None

    if Name_1 != None and Name2_1 != None:
        FullName_1 = Name_1 + Name2_1
    elif Name_1 != None:
        FullName_1 = Name_1
    else:
        FullName_1 = None

    #DateOfBirth
    if len(DateB_text) != 0 :
        DateB_text = DateB_text.replace('S', '5')
        DateB_text = CorrectDate(DateB_text)
        DateOfBirth = re.search("([0-9]{2}\/[0-9]{2}\/[0-9]{4})", DateB_text)
        if DateOfBirth != None :
            BirthDate_1 = DateOfBirth[0]
        else:
            BirthDate_1 = None
    else:
        BirthDate_1 = None
        
    #print(BirthDate_1)

    #PlaceOfBirth 
    if len(PlaceB_text) != 0: 
        PlaceB_text = PlaceB_text.replace('\n', ' ')
        PlaceB_text = re.sub(r'[^\w]', ' ', PlaceB_text)
        PlaceB_text = re.sub(r'[0-9]+', '', PlaceB_text)
        PlaceFind = re.findall('([A-Z]+(?:(?!\s?[A-Z][a-z])\s?[A-Z])+)', PlaceB_text)
        
        if len(PlaceFind) != 0:
            BirthPlace = PlaceFind[0]
        else:
            BirthPlace = None
    else:
        BirthPlace = None

    #if BirthPlace != None :
        #print(BirthPlace)

    #Nationality
    if len(Nation_text) != 0: 
        Nation_text = Nation_text.replace('\n', ' ')
        Nation_text = re.sub(r'[^\w]', ' ', Nation_text)
        Nation_text = re.sub(r'[0-9]+', '', Nation_text)
        NationFind = re.findall('([A-Z]+(?:(?!\s?[A-Z][a-z])\s?[A-Z])+)', Nation_text)
        
        if len(NationFind) != 0:
            Nation_1 = NationFind[0]
        else:
            Nation_1 = None
    else:
        Nation_1 = None

    #if Nation_1 != None :
        #print(spell(Nation_1))

    #DateOfIssue
    if len(DateI_text) != 0 :
        DateI_text = DateI_text.replace('S', '5')
        DateI_text = CorrectDate(DateI_text)
        IDateFind  = re.search("([0-9]{2}\/[0-9]{2}\/[0-9]{4})", DateI_text)
        if  IDateFind != None  :
            IssueDate = IDateFind[0]
        else:
            IssueDate = None
    else:
        IssueDate = None
    #print (IssueDate)
    
    #DateOfExpirey
    if len(DateE_text) != 0 :
        DateE_text = DateE_text.replace('S', '5')
        DateE_text = CorrectDate(DateE_text)
        EDateFind = re.search("([0-9]{2}\/[0-9]{2}\/[0-9]{4})", DateE_text)
        if EDateFind != None:
            ExpireDate_1 = EDateFind[0]
        else:
            ExpireDate_1 = None
    else:
        ExpireDate_1 = None

    #print (ExpireDate_1)

    #Proffesion 
    if len(Proff_text) != 0 :
        Proff_text = re.sub(r'[^\w]', ' ', Proff_text)
        Proff_text = re.sub(r'[0-9]+', '', Proff_text)
        ProffesFind = re.findall('([A-Z]+(?:(?!\s?[A-Z][a-z])\s?[A-Z])+)', Proff_text)
        if len(ProffesFind) != 0 :
            Total_Proffesion = ""
            for proff in range(len(ProffesFind)):
                if len(ProffesFind[proff]) > 3:
                    Total_Proffesion += ProffesFind[proff]
        else:
            Total_Proffesion = None
    else:
        Total_Proffesion = None

    #print(process(Total_Proffesion))


    return PassNum_1,FullName_1,BirthDate_1,BirthPlace,Nation_1,IssueDate,ExpireDate_1,Total_Proffesion

def PassportMRZCutter(InputImage):
    Kernel_Vertical = np.ones((2,1), np.uint8)
    Kernel_sharpen = np.array([[-1,-1,-1], [-1, 9,-1],[-1,-1,-1]])
    Kernel = np.ones((2,2), np.uint8)

    Edged = PassportMatcher(InputImage)
    EdgedGray = cv2.cvtColor(Edged, cv2.COLOR_BGR2GRAY)
    EdgedR = cv2.resize(EdgedGray,(1600,1100))
    EdgedR = cv2.filter2D(EdgedR, -1, Kernel_sharpen)

    clahe = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(5,5))
    MRZ  = EdgedR[855:1045,80:1550]
    MRZ = clahe.apply(MRZ)


    MRZ1   = MRZ[0:120,0:1550]
    MRZ2   = MRZ[120:240,0:1550]


    _,MRZ1 = cv2.threshold(MRZ1,220,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    MRZ1   = cv2.dilate(MRZ1,Kernel,iterations=1)
    MRZ1   = cv2.erode(MRZ1,Kernel_Vertical,iterations=2)

    _,MRZ2 = cv2.threshold(MRZ2,220,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    MRZ2   = cv2.dilate(MRZ2,Kernel,iterations=1)
    MRZ2   = cv2.erode(MRZ2,Kernel_Vertical,iterations=2)


    _,MRZ = cv2.threshold(MRZ,160,180,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    MRZ   = cv2.dilate(MRZ,Kernel,iterations=1)
    MRZ   = cv2.erode(MRZ,Kernel_Vertical,iterations=2)


    return MRZ1,MRZ2,MRZ


def PassportMRZParser(MRZ1,MRZ2,MRZ):
    config = '-l ocrb --oem 1 --psm 6'
    Upper = pytesseract.image_to_string(MRZ1,config=config)
    Upper = Upper.replace('\n',' ')
    Upper = Upper.replace(' ','')
    Upper = " ".join(Upper.split())
    if len(Upper) < 44:
            Upper = Upper + '<'*(44 - len(Upper))
    if len(Upper) > 44:
            Upper = Upper[:44]

    #print(Upper)
    #print(len(Upper))

    config = '-l ocrb --oem 1 --psm 6'
    Lower = pytesseract.image_to_string(MRZ2,config=config)
    Lower = Lower.replace('\n',' ')
    Lower = Lower.replace(' ','')
    #Lower = Lower.replace('<','')
    Lower = " ".join(Lower.split())
    if len(Lower) < 44:
            Lower = Lower + '<'*(44 - len(Lower))
    if len(Lower) > 44:
            Lower = Lower[:44]
    #print(Lower)
    #print(len(Lower))

    UpperLower = Upper + "\n" + Lower
    UpperLower = UpperLower.splitlines()

    config_ = ("--psm 6 -l ocrb")
    MRZ_Text = pytesseract.image_to_string(MRZ,lang = 'ocrb', config=config_)
    MRZ_Text = MRZ_Text.splitlines()

    for line in range(len(MRZ_Text)):
        if len(MRZ_Text[line]) < 44:
            MRZ_Text[line] = MRZ_Text[line] + '<'*(44 - len(MRZ_Text[line]))
        if len(MRZ_Text[line]) > 44:
            MRZ_Text[line] = MRZ_Text[line][:44]
            
    MRZFinal = [None] * 2

    for line in range(2):
        MRZFinal[line] = MRZ_Text[line] if UpperLower[line] != None and MRZ_Text[line] != None and sum(a==b for a, b in zip(MRZ_Text[line],UpperLower[line])) > 41 else UpperLower[line]

    return MRZFinal


def PassportMRZFinalParser(a, b):
    
    Country = a[2:5]
    Surname_names = a[5:44].split('<<', 1)
    if len(Surname_names) < 2:
        Surname_names += ['']
    Surname, Names = Surname_names
    Names       = Names.replace('<', ' ').strip()
    Surname     = Surname.replace('<', ' ').strip()
    FullName    = Names + " " + Surname
    PassNum     = b[0:9]
    Nationality = b[10:13]
    DateBirth   = b[13:19]
    Gender      = b[20]
    DateExpire  = b[21:27]
    
    if DateBirth.isdigit():
        DateBirth_ = ChangeDate(DateBirth)
    else:
        DateBirth_ = None
    if DateExpire.isdigit():
        DateExpire_ = ChangeDate(DateExpire)
    else:
        DateExpire_ = None
        
    if Gender.isdigit():
        Gender = None
    else:
        if Gender == 'M':
            Gender = 'Male'
        elif Gender == 'F':
            Gender = 'Female'
        else:
            Gender = None

    return FullName,PassNum,Nationality,Gender,DateBirth_,DateExpire_

def PassportScanner(InputImage):
    
    PassNum_IMG,Name_IMG,Name2_IMG,DateB_IMG,PlaceB_IMG,Nation_IMG,DateI_IMG,DateE_IMG,Proff_IMG = PassportCutter(InputImage)
    PassNum_1,FullName_1,BirthDate_1,BirthPlace,Nation_1,IssueDate,ExpireDate_1,Total_Proffesion = PassportParser(PassNum_IMG,Name_IMG,Name2_IMG,DateB_IMG,PlaceB_IMG,Nation_IMG,DateI_IMG,DateE_IMG,Proff_IMG)
    
    MRZ1,MRZ2,MRZ = PassportMRZCutter(InputImage)
    MRZFinal      = PassportMRZParser(MRZ1,MRZ2,MRZ)
    
    FullName_2,PassNum_2,Nation_2,Gender,BirthDate_2,ExpireDate_2 = PassportMRZFinalParser(MRZFinal[0],MRZFinal[1])
    

    PassportNumber = PassNum_1    if PassNum_1 != None and PassNum_2 != None and sum(a==b for a, b in zip(PassNum_1,PassNum_2)) > 8 else PassNum_2
    PassportName   = FullName_1   if FullName_1 != None and FullName_2 != None  and sum(a==b for a, b in zip(FullName_1,FullName_2)) > len(FullName_2)-3 else FullName_2
    NationCountry  = Nation_1     if Nation_1 != None and Nation_2 != None and sum(a==b for a, b in zip(Nation_1,Nation_2)) > 2 else Nation_2
    Gender         = Gender
    BirthDate      = BirthDate_1  if BirthDate_1 != None and BirthDate_2 != None  and sum(a==b for a, b in zip(BirthDate_1,BirthDate_2)) > 6 else BirthDate_2
    ExpireDate     = ExpireDate_1 if ExpireDate_1 != None and ExpireDate_2 != None  and sum(a==b for a, b in zip(ExpireDate_1,ExpireDate_2)) > 6 else ExpireDate_2
    IssueDate      = IssueDate
    BirthPlace     = BirthPlace
    Profession     = Total_Proffesion
    
    data={
        "PassportNumber":PassportNumber,
        "Name":PassportName,
        "Country":NationCountry,
        "Gender":Gender,
        "BirthDate":BirthDate,
        "ExpireDate":ExpireDate,
        "IssueDate":IssueDate,
        "BirthPlace":BirthPlace,
        "Profession":Profession
    }
    return data