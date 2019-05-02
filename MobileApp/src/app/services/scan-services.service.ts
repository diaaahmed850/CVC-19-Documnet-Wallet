import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ScanServicesService {

  constructor(private http: HttpClient) { }
  scanId(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post('http://192.168.1.111:8000/id',body)
  }
  scanPassport(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post('http://192.168.1.111:8000/pass',body)
  }
  login(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post('http://192.168.1.111:8000/signin',body)
  }
  socialLogin(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
   
    return this.http.post('http://192.168.1.111:8000/socialLogin',body)
  }
  register(body){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json'
  });
  const options = { headers: headers };
    return this.http.post('http://192.168.1.111:8000/signup',body)
  }
  getData(headers){
     
  const options = { headers: headers };
    return this.http.get('http://192.168.1.111:8000/doc',options)
  }
  saveData(body,headers){
     
    const options = { headers: headers };
      return this.http.post('http://192.168.1.111:8000/doc',body,options)
    }
  getDocument(headers,id){
     
    const options = { headers: headers };
      return this.http.get('http://192.168.1.111:8000/doc/'+id,options)
    }
    editDocument(headers,body,id){
     
      const options = { headers: headers };
        return this.http.put('http://192.168.1.111:8000/doc/'+id,body,options)
      }
deleteDocument(headers,id){
  const options = { headers: headers };
      return this.http.delete('http://192.168.1.111:8000/doc/'+id,options)
}


   
}

