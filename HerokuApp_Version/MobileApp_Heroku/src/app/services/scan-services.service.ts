import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ScanServicesService {
url1='http://192.168.1.111:8000/'
url='https://vision19.herokuapp.com/'
  constructor(private http: HttpClient) { }
  uploadImage(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post(this.url+'file',body)
  }
  getId(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.get(this.url+'id')
  }
  getPassport(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.get(this.url+'passport')
  }
  getLicence(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.get(this.url+'licence')
  }
  getCard(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.get(this.url+'businesscard')
  }
  restartServer(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer b6bb8899-8c93-4b58-8186-bde8f68cc743',
    'Accept':'application/vnd.heroku+json; version=3'
  });
  const options = { headers: headers };
  return this.http.delete('https://api.heroku.com/apps/vision19/dynos',options)
    
  }
  scanId(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post(this.url+'id',body)
  }
  scanPassport(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post(this.url+'pass',body)
  }
  scanLicence(body){
    return this.http.post(this.url+'licence',body)
  }
  scanBusinessCard(body){
    return this.http.post(this.url+'businesscard',body)
  }
  getFines(body){
    return this.http.post(this.url+'fines',body)
  }

  login(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post(this.url+'signin',body)
  }
  socialLogin(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
   
    return this.http.post(this.url+'socialLogin',body)
  }
  register(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post(this.url+'signup',body)
  }
  getData(headers){
     
  const options = { headers: headers };
    return this.http.get(this.url+'doc',options)
  }
  saveData(body,headers){
     
    const options = { headers: headers };
      return this.http.post(this.url+'doc',body,options)
    }
  getDocument(headers,id){
     
    const options = { headers: headers };
      return this.http.get(this.url+'doc/'+id,options)
    }
    editDocument(headers,body,id){
     
      const options = { headers: headers };
        return this.http.put(this.url+'doc/'+id,body,options)
      }
deleteDocument(headers,id){
  const options = { headers: headers };
      return this.http.delete(this.url+'doc/'+id,options)
}


   
}

