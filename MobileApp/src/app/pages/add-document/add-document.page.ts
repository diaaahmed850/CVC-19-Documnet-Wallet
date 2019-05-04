import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import {ScanServicesService} from '../../services/scan-services.service'
import { Storage } from '@ionic/storage';
import {   HttpHeaders } from '@angular/common/http'
import { AlertController } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,private camera: Camera,public loadingController: LoadingController,private service:ScanServicesService,private storage:Storage,public alertController: AlertController,private contacts: Contacts,public toastController: ToastController,) { }
  type:any=''
  image:any=''
  data:any='';
  loaderToShow: any;
  keys=[]
values=[]
show=false
  doc_types={
    "Natinal ID":0,
    "Passport":1,
    "Licence":2,
    "Business Card":3
  }
   
  
  ngOnInit() {
    this.route.params.subscribe( params =>{
      console.log(params['type'])
      this.type=params['type']

  })
  }
  async presentAlert(header,err) {
    const alert = await this.alertController.create({
      header: header,
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }
  openCam(){
    if(this.show){
      this.show=false
    }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 1500,
      targetHeight: 1500,
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
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })

     }
     else if (this.type=="Passport"){
      this.service.scanPassport({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })
     }
     else if (this.type=="Licence"){
      this.service.scanLicence({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })
     }
     else if (this.type=="Business Card"){
      this.service.scanBusinessCard({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })
     }
     
     
    }, (err) => {
     // Handle error
     //alert("error "+JSON.stringify(err))
    });

  }
  openGallery(){
    if(this.show){
      this.show=false
    }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 1500,
      targetHeight: 1500,
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
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })

     }
     else if (this.type=="Passport"){
      this.service.scanPassport({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })
     }
     else if (this.type=="Licence"){
      this.service.scanLicence({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
      })
     }
     else if (this.type=="Business Card"){
      this.service.scanBusinessCard({'img':imageData}).subscribe(res=>{
        this.hideLoader()
       this.data=res
       this.parseData(this.data)
       this.show=true
       console.log(res)
 
      },err=>{
        this.hideLoader()
        this.presentAlert('Alert',err.error.error)
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
  checkLicense(){
    if(this.type=="Licence")
    {
      return true
    }
    else{
      return false
    }
  }
  checkCard(){
    if(this.type=="Business Card")
    {
      return true
    }
    else{
      return false
    }
  }
  getFines(){
    if(this.type=="Licence"){
      this.showLoader()
      this.service.getFines(this.data).subscribe(res=>{
        this.hideLoader()
        this.presentAlert('Total Fines','Your Total Fines is : '+res['Fines'])
      })
    }
  }
saveContacts(){
  if(this.type=="Business Card"){
    let contact: Contact = this.contacts.create();
    contact.displayName=this.data['Name']
    let keys_length=this.keys.length
    let phone_fields=[]
    let email_fields=[]
    for(let i=0;i<keys_length;i++){
      if(this.keys[i].includes('Phone')){
        phone_fields.push(new ContactField(this.keys[i], this.values[i]))
      }
      if(this.keys[i].includes('Email')){
        email_fields.push(new ContactField(this.keys[i], this.values[i]))
      }
    }
    //contact.name = new ContactName(null, 'Smith', 'John');
    if(phone_fields.length!=0){
      contact.phoneNumbers = phone_fields;
    }
    if(email_fields.length!=0){
      contact.emails = email_fields;
    }
     
    contact.save().then(
      () => {console.log('Contact saved!', contact)
      this.presentAlert('Success','Contact saved!')
    },
      (error: any) => {console.error('Error saving contact.', error)
      this.presentAlert('Error','Error saving contact.')
    }
    );
  }
  /*let contact: Contact = this.contacts.create();

contact.name = new ContactName(null, 'Smith', 'John');
contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
contact.save().then(
  () => {console.log('Contact saved!', contact)
  this.presentAlert('Success','Contact saved!')
},
  (error: any) =>{console.error('Error saving contact.', error)
  this.presentAlert('Error','Error saving contact.')
}
);*/
  
}
   
parseData(data){
  this.keys=[]
  this.values=[]
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
        console.log(key + " -> " + data[key]);
        this.keys.push(key)
        this.values.push(data[key])
    }
}
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
          this.presentToast('The Document is saved Successfully!')
           this.router.navigate(['/menu/main'])
        },err=>{
          console.log(err)
        })
      }
    })
    
    

  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color:'dark',
      duration: 4000
    });
    toast.present();
  }
   

}
