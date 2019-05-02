import { Component, OnInit } from '@angular/core';
import {ScanServicesService} from '../../services/scan-services.service'
import { Storage } from '@ionic/storage';
import {   HttpHeaders } from '@angular/common/http'
import {Router,ActivatedRoute} from '@angular/router';
import { KeyRegistry } from '@angular/core/src/di/reflective_key';
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
   
  constructor(private storage:Storage,private service:ScanServicesService,private router: Router,private route: ActivatedRoute,public navCtrl: NavController) { }
document:any;
id:any
keys=[]
values=[]
readOnly=true
  ngOnInit() {
    /*this.readOnly=true
    this.keys=[]
    this.route.params.subscribe( params =>{
      console.log(params['id'])
      this.id=params['id']
      this.storage.get('auth-token').then(res => {
        if (res) {
          const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
          this.service.getDocument(headers,this.id).subscribe(res=>{
            console.log(res)
            this.document=res
            for (var key in this.document.data) {
              if (this.document.data.hasOwnProperty(key)) {
                  console.log(key + " -> " + this.document.data[key]);
                  this.keys.push(key)
                  this.values.push(this.document.data[key])
              }
          }
          },err=>{
            console.log(err)
          })
        }
      })

  })*/
    
    
  }

  isReadonly(){
    if(this.readOnly){
      return true
    }
    else{
      return false
    }

  }
  edit(){
    this.readOnly=false
  }
  delete(){
    this.storage.get('auth-token').then(res => {
      if (res) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
        this.service.deleteDocument(headers,this.id).subscribe(res=>{
          console.log(res)
           this.router.navigate(['/menu/main'])
        },err=>{
          console.log(err)
        })
      }
    })
  }
  ionViewWillEnter(){
    console.log("entered")
     
    this.readOnly=true
    this.keys=[]
    this.route.params.subscribe( params =>{
      console.log(params['id'])
      this.id=params['id']
      this.storage.get('auth-token').then(res => {
        if (res) {
          const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
          this.service.getDocument(headers,this.id).subscribe(res=>{
            console.log(res)
            this.document=res
            for (var key in this.document.data) {
              if (this.document.data.hasOwnProperty(key)) {
                  console.log(key + " -> " + this.document.data[key]);
                  this.keys.push(key)
                  this.values.push(this.document.data[key])
              }
          }
          },err=>{
            console.log(err)
          })
        }
      })

  })
  }
  saveData(form){
    console.log(form.form.value)
    let form_data=form.form.value
     
    let body={
      "title":this.document['title'],
      "docType":this.document['docType'],
      "data":form_data
    }
    console.log(body)
    this.storage.get('auth-token').then(res => {
      if (res) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
        this.service.editDocument(headers,body,this.id).subscribe(res=>{
          console.log(res)
          this.readOnly=true
           this.router.navigate(['/menu/document/'+this.id])
            
           //this.navCtrl.navigateRoot('/document/'+this.id)
        },err=>{
          console.log(err)
        })
      }
    })
    
    

  }

  }


