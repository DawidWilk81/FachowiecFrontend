import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user;
  constructor(
    private _us:UserService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.user = {
      username:'',
      password:'',
      password2:'',
      email:''
    }
  }

  registerUser(){
    if (this.user.password){
      if(this.user.password == this.user.password2){
        let body = new FormData;
        body.append('username', this.user.username);
        body.append('password', this.user.password);
        body.append('email', this.user.email);
        return this._us.registerUser(body).subscribe(
          Response =>{
          console.log(Response);
          alert('zarejestrowano pomyślnie');
          this._router.navigateByUrl('');
        },error =>{console.log(error)}
        )
      }
    }else{
      alert('podane hasła nie są identyczne');
    }
  }
}
