import { Component, OnInit } from '@angular/core';
import {ScanServicesService} from '../../services/scan-services.service'
import {   HttpHeaders } from '@angular/common/http'
import { Storage } from '@ionic/storage';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
documents:any
  constructor(private storage:Storage,private service:ScanServicesService,private router:Router) { }

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
   

}
