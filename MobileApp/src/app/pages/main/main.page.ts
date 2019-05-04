import { Component, OnInit } from '@angular/core';
import {ScanServicesService} from '../../services/scan-services.service'
import {   HttpHeaders } from '@angular/common/http'
import { Storage } from '@ionic/storage';
import {Router,ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
documents:any=[]
  constructor(private storage:Storage,private service:ScanServicesService,private router:Router,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    /*this.storage.get('auth-token').then(res => {
      if (res) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
        this.service.getData(headers).subscribe(res=>{
          console.log(res)
          this.documents=res
        },err=>{
          console.log(err)
        })
      }
    })*/
    
  }
  ionViewWillEnter(){
    console.log("diaa ya nas")
    this.storage.get('auth-token').then(res => {
      if (res) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
        this.service.getData(headers).subscribe(res=>{
          console.log(res)
          this.documents=res
        },err=>{
          console.log(err)
        })
      }
    })
  }
  selectDocument(id){
    this.router.navigate(['/menu/document/'+id])

  }
  showSheet(){
    this.presentActionSheet()
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Type of Documents',
      buttons: [ {
        text: 'National ID',
        handler: () => {
          this.router.navigate(['/menu/add/Natinal ID'])
        }
      }, {
        text: 'Passport',
        handler: () => {
          this.router.navigate(['/menu/add/Passport'])
        }
      }, {
        text: 'Car Licence',
        handler: () => {
          this.router.navigate(['/menu/add/Licence'])
        }
      }, {
        text: 'Business Card',
        handler: () => {
          this.router.navigate(['/menu/add/Business Card'])
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  checkData(){
    if(this.documents.length==0){
      return true
    }
    else{
      return false
    }
  }
   

}
