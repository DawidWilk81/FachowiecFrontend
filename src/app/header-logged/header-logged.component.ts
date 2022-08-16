import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
})
export class HeaderLoggedComponent implements OnInit {
loginCard:boolean = false;
token;
id;
profile;
public navbarCollapsed:boolean = true;
  constructor(
    private _us:UserService,
    private _router:Router
  ) { 
    this.id = localStorage.getItem('user_id');
    this._us.getWorkerInfo(this.id).subscribe(
      Response =>{
        this.profile = Response['fachowiec'];
        console.log('konto:', this.profile);
        console.log(Response);
      }, error =>{
        console.log(error);
      }
    )
  }
    
  ngOnInit(): void {
    this.token = localStorage.getItem('token');

  } 
  showLoginCard(){
    this.loginCard = !this.loginCard;
  }
  logout(){
    this._us.logout();
  }
  addAnn(){
    this._router.navigateByUrl('home/dodaj')
  }
  myAcc(){
    this._router.navigateByUrl('home/mojeKonto')
  }  
  myPosts(){
    this._router.navigateByUrl('home/mojeOgloszenia');
  }
  home(){
    if(this.token){
      this._router.navigateByUrl('home');
    }else{
      this._router.navigateByUrl('');
    }
  }
}
