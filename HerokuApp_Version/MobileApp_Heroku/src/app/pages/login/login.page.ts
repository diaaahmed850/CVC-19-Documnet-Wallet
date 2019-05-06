import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  constructor(private authService: AuthenticationService,private fb: Facebook,private googlePlus:GooglePlus,public loadingController: LoadingController,private storage:Storage) { }
 
  ngOnInit() {
  }
 
  login(form) {
    console.log(form.form.value)
    this.authService.storeEmail(form.form.value['email'])
    this.authService.login(form.form.value);
  }
  async doFbLogin(){
		/*const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);*/
		let permissions = new Array<string>();

		//the permissions your facebook app needs from the user
     permissions = ["public_profile", "email"];

		this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;

			//Getting name and gender properties
			this.fb.api("/me?fields=name,email", permissions)
			.then(user =>{
        console.log(user)
				user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        console.log(user.email)
        this.authService.socialLogin({
          "provider":"facebook",
          "email":user.email,
          "socialID":userId
        })
				this.storage.set('user',
				{
          provider:"facebook",
          name: user.name,
          
					email: user.email,
					picture: user.picture
				})
				.then(() =>{
					 
					//loading.dismiss();
				}, error =>{
					console.log(error);
					//loading.dismiss();
				})
			})
		}, error =>{
			console.log(error);
			//loading.dismiss();
		});
  }
  async doGoogleLogin(){
    /*const loading = await this.loadingController.create({
      message: 'Please wait...'
    });*/
    //this.presentLoading(loading);
    this.googlePlus.login({}).then((user) => {
      
      console.log(user);
      
      this.authService.socialLogin({
        "provider":"google",
        "email":user.email,
        "socialID":user.userId
      })
       
      this.storage.set('user', {
        provider:"google",
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(() =>{
        //loading.dismiss();
      }, error =>{
        console.log(error);
        //loading.dismiss();
      })
    }).catch((err) => {
      
      console.log(err);
      //loading.dismiss();
    });
     
  
  }
	async presentLoading(loading) {
		return await loading.present();
	}

 
}