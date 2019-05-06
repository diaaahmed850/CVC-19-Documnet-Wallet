import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Add new document',
      children: [
        {
          title: 'National ID',
          url: '/menu/add/Natinal ID',
          icon: 'add'
        },
        {
          title: 'Passport',
          url: '/menu/add/Passport',
          icon: 'add'
        },
        {
          title: 'Licence',
          url: '/menu/add/Licence',
          icon: 'add'
        },
        {
          title: 'Business Card',
          url: '/menu/add/Business Card',
          icon: 'add'
        }
         
      ]
    },
    

  ];
   
  flag=true
  name=''
  picture=''

  constructor(private authservice:AuthenticationService,private storage:Storage) { }

  ngOnInit() {
    this.storage.get('user').then(res => {
      if (res) {
        console.log(res)
        if(res.name){
          console.log("hna")
          console.log(res.name)
          this.name=res.name
          
        }
        else{
          this.name=res.email
          
        }
        if(res.picture){
          this.picture=res.picture

        }
        else{
          this.picture="assets/man.svg"
        }
         
         console.log(res)
      }
    })
  }
  checkLogOut(p){
    if(p.title=="Log Out"&&this.flag){
      this.flag=false
      return true 
    }
    else{
      return false
    }
  }
  logOut(){
this.authservice.logout()
  }
}
