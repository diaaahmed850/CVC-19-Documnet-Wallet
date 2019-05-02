import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import {ScanServicesService} from '../../services/scan-services.service'
import { Storage } from '@ionic/storage';
import {   HttpHeaders } from '@angular/common/http'
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,private camera: Camera,public loadingController: LoadingController,private service:ScanServicesService,private storage:Storage) { }
  type:any=''
  image:any=''
  data:any='';
  loaderToShow: any;
  doc_types={
    "Natinal ID":0,
    "Passport":1
  }
  ngOnInit() {
    this.route.params.subscribe( params =>{
      console.log(params['type'])
      this.type=params['type']

  })
  }
  openCam(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:1
  
    }
    

     
      
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //alert(imageData)
     //this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
     this.image='data:image/jpeg;base64,' + imageData;
     //this.data=imageData
     console.log("diaa")

     this.showLoader()
     if(this.type=="Natinal ID"){
      this.service.scanId({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       console.log(res)
 
      },err=>{
 
      })

     }
     else if (this.type=="Passport"){
      this.service.scanPassport({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.data['dob']=this.reverseString(this.data['dob'])
       this.data['exp_date']=this.reverseString(this.data['exp_date'])
       console.log(res)
 
      },err=>{
 
      })
     }
     
     
    }, (err) => {
     // Handle error
     //alert("error "+JSON.stringify(err))
    });

  }
  openGallery(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:0
  
    }
      
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //alert(imageData)
     //this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
     this.image='data:image/jpeg;base64,' + imageData;
     //this.data=imageData
     console.log("diaa")
     this.showLoader()
     if(this.type=="Natinal ID"){
      this.service.scanId({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       console.log(res)
 
      },err=>{
 
      })

     }
     else if (this.type=="Passport"){
      this.service.scanPassport({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.data['dob']=this.reverseString(this.data['dob'])
       this.data['exp_date']=this.reverseString(this.data['exp_date'])
        
       console.log(res)
 
      },err=>{
 
      })
     }
     
    }, (err) => {
     // Handle error
     //alert("error "+JSON.stringify(err))
    });
  }
  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Please wait'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    //
  }
 
  hideLoader() {
    this.loadingController.dismiss();
     
  }
   
  chechID(){
    if(this.type=="Natinal ID")
    {
      return true
    }
    else{
      return false
    }
  }
  chechPassport(){
    if(this.type=="Passport")
    {
      return true
    }
    else{
      return false
    }
  }
  reverseString(str){
    str = str.split(""); //convert 'jQuery' to array
    str = str.reverse(); //reverse 'jQuery' order 
    str = str.join(""); //then join the reverse order values together
    return str
  }
  saveData(form){
    console.log(form.form.value)
    let form_data=form.form.value
    let title=form.form.value['title']
    delete form_data.title
    let body={
      "title":title,
      "docType":this.doc_types[this.type],
      "data":form_data
    }
    console.log(body)
    this.storage.get('auth-token').then(res => {
      if (res) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
        this.service.saveData(body,headers).subscribe(res=>{
          console.log(res)
           this.router.navigate(['/menu/main'])
        },err=>{
          console.log(err)
        })
      }
    })
    
    

  }

}
