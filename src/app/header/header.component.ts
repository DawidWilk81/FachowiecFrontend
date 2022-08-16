import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public navbarCollapsed = true;
  loginCard = false;
  userLogin;
  error = false;
  constructor(
    private _us:UserService,
    private _router:Router
              ) { }

  ngOnInit(): void {
    this.userLogin= {
      username:'',
      password:''
  }
  }

//pokaz okno logowania
showLoginCard(){
  this.loginCard = !this.loginCard;
}
back(){
  this._router.navigateByUrl('');
}
loginUser(){
  this._us.loginUser({username:this.userLogin.username, password:this.userLogin.password});
}
}
