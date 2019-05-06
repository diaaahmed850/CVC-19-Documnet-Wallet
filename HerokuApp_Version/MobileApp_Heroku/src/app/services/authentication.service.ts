import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController } from '@ionic/angular';
import {ScanServicesService} from './scan-services.service'
import { AlertController } from '@ionic/angular';
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  loaderToShow: any;
  constructor(private storage: Storage, private plt: Platform,private service:ScanServicesService,private fb: Facebook,private googlePlus:GooglePlus,public alertController: AlertController,public loadingController: LoadingController) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(data) {
    this.showLoader()
    this.service.login(data).subscribe(res=>{
      console.log(res['token'])
       this.storage.set(TOKEN_KEY, res['token']).then(() => {
         this.hideLoader()
        this.authenticationState.next(true);

      });
    },err=>{
      this.hideLoader()
      console.log(err.error.Error)
      if(err.error.Error){
        this.presentAlert(err.error.Error)
      }
      else if(err.error.error){
        this.presentAlert(err.error.error)
      }
      else{
        this.service.restartServer().subscribe(res=>{
  
        })
        this.presentAlert("Please try again later")
      }
      
      
    
    })
     
  }
  async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }
  socialLogin(data) {
    this.showLoader()
    this.service.socialLogin(data).subscribe(res=>{
      
      console.log(res['token'])
       this.storage.set(TOKEN_KEY, res['token']).then(() => {
        this.hideLoader()
        this.authenticationState.next(true);
        
      });
    },err=>{
      this.hideLoader()
      console.log(err.error.Error)
      if(err.error.Error){
        this.presentAlert(err.error.Error)
      }
      else if(err.error.error){
        this.presentAlert(err.error.error)
      }
      else{
        this.service.restartServer().subscribe(res=>{
  
        })
        this.presentAlert("Please try again later")
      }
      
    })
     
  }
  register(data) {
    this.showLoader()
    this.service.register(data).subscribe(res=>{
      console.log(res['token'])
       this.storage.set(TOKEN_KEY, res['token']).then(() => {
         this.hideLoader()
        this.authenticationState.next(true);
      });
    },err=>{
      this.hideLoader()
      console.log(err.error.Error)
      if(err.error.Error){
        this.presentAlert(err.error.Error)
      }
      else if(err.error.error){
        this.presentAlert(err.error.error)
      }
      else{
        this.service.restartServer().subscribe(res=>{
  
        })
        this.presentAlert("Please try again later")
      }
      
    })
     
  }
 
  logout() {
    this.storage.get('user').then(user=>{
      if(user.provider){
        if(user.provider=="google"){
          this.googlePlus.logout()
	              .then(res =>{
            //user logged out so we will remove him from the NativeStorage
            this.storage.remove('user');
            
          }, err =>{
            console.log(err);
          })


        }
        else if(user.provider=="facebook"){
          this.fb.logout()
              .then(res =>{
                //user logged out so we will remove him from the NativeStorage
                this.storage.remove('user');
                
              }, error =>{
                console.log(error);
              });

        }
      }
      else{
        this.storage.remove('user')
      }
    })
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
    /*return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.storage.remove('user').then(res=>{

      }).catch(err=>{

      })
    });*/
    

  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
  storeEmail(user_email){
    this.storage.set('user', {email:user_email}).then(() => {
      console.log(user_email)

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
  
}