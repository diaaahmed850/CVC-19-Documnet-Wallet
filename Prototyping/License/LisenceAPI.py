import re
import mechanize

link = "https://www.egypt.gov.eg/mobile/Services/NTPMOJ-GG/functions/PayFines.aspx"

def GetFines(link,Char1,Char2,Char3,Num):
    br = mechanize.Browser()
    br.open(link)
    br.select_form(nr=0)
    br['cSearch$txtPlateAlpaNum$txtFL']=Char1
    br['cSearch$txtPlateAlpaNum$txtSL']=Char2
    br['cSearch$txtPlateAlpaNum$txtTL']=Char3
    br['cSearch$txtPlateAlpaNum$txtDg']=Num
    br.submit(nr=0)
    response = br.response().read()
    response = response.decode('utf-8')
    result   = re.search('<span id="cFinesSummary_lblTotalNew" class="keyword">(.*)</span>', response)
    return result.group(1)
