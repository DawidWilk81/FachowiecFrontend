import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../user.service';
import { faArrowAltCircleRight, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.component.html',
  styleUrls: ['./register-worker.component.scss']
})
export class RegisterWorkerComponent implements OnInit {

  row = document.getElementById('RegisterRow');
  loginCard:boolean = false;
  user;
  worker;
  lewaStrona:boolean = true;
  showImg:boolean = false;
  imageUrl;
  success:boolean = false;
  checked;
  is_there;
  userLogin;
  //errors
  errorLogin:boolean = false;
  errorHaslo:boolean = false;
  errorHasloEq:boolean = false;
  errorEmail:boolean = false;

  //icons
  arrow = faArrowAltCircleRight;
  faUser= faUserAlt;
  //search
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(
    private _us:UserService,
    private _renderer:Renderer2,
    private _router:Router
  ) { }
  navbarCollapsed:boolean = true;



  ngOnInit(): void {
    this.user={
      username:'',
      email:'',
      password:'',
      password2:''
    }
    this.userLogin = {
      username:'',
      password:''
    }
    this.worker={
      profileImage:File,
      bio:'Jestem najlepszy w swoim fachu',
      category:[]
      
    }
  }

  showLoginCard(){
    this.loginCard = !this.loginCard;
  }

  login(){
    return this._us.loginUser({username:this.userLogin.username,password:this.userLogin.password});
  }

next() {
  //pobierz kontener
  const registerForm: HTMLElement = document.getElementById('registerForm');
  const login = registerForm.children[0];
  const email = registerForm.children[1];
  const password = registerForm.children[2];
  const password2 = registerForm.children[3];
  //pobierz inputy z kontenerów
  const LoginInput = login.children[1];
  const EmailInput = email.children[1];
  const passwordInput = password.children[1];
  const passwordInput2 = password2.children[1];
  if(this.user.username.length < 64 && this.user.username.length > 1){
  if(this.user.password != this.user.password2){
    this.errorHasloEq = !this.errorHasloEq;
    this._renderer.setStyle(passwordInput, 'border', '3px solid red');
    this._renderer.setStyle(passwordInput2, 'border', '3px solid red');
    }else if((this.user.password.length >=64 && this.user.password2.length >=64) && (this.user.password.length <6 && this.user.password2.length <6)){
      this.errorHaslo = !this.errorHaslo;
      this._renderer.setStyle(passwordInput, 'border', '3px solid red');
      this._renderer.setStyle(passwordInput2, 'border', '3px solid red');
    }else{
      this.registerWorker();
    }
  }else{
      this._renderer.setStyle(LoginInput, 'border', '3px solid red');
      this.errorLogin = !this.errorLogin; 
    }
}

registerWorker(){
  return this._us.registerWorker(
    {
      username:this.user.username,
      password:this.user.password,
      email:this.user.email,
      fachowiec:{
        bio:'Jestem nowym fachowcem',
        rating:1,
        is_worker:true,
      }
    }).subscribe(
    Response=>{
      alert('Zarejestrowano nowego fachowca');
      this._router.navigateByUrl('');
    },error=>{
      console.log(error);
    }
  );
}
}
