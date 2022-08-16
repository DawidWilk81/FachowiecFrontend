import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class UserService{

// http options used for making API calls
private httpOptions= new HttpHeaders(
  {'Content-Type': 'application/json'},
);

// the actual JWT token
public token: string;

//Refresh Token
public refreshToken: string;

// the token expiration date
public token_expires

// the username of the logged in user
public username: string;

// error messages received from the login attempt
public errors: any = [];
is_worker;
httpLogged;

helper = new JwtHelperService();
  private backendLink = 'http://localhost:8000/';
  constructor(
    private http:HttpClient,
    private _router:Router
  ) {
    this.token = localStorage.getItem('token');
    this.httpLogged = new HttpHeaders(
      {'Authorization': `Bearer ${this.token}`}
    )
   }

loginUser(userData){
  return this.http.post(this.backendLink + 'api/auth/', userData).subscribe(
    Response =>{
      alert('Zalogowano pomyślnie');
      this._router.navigateByUrl('home');
      this.setSession(Response);
    },Error =>{
      console.log(Error)
      alert('Login lub hasło jest nieprawidłowe');
    }
  )
}

registerUser(userData:any): Observable<any> {
  return this.http.post(this.backendLink + 'api/users/', userData);
}

registerWorker(userData:any): Observable<any> {
  return this.http.post(this.backendLink + 'api/workers/', userData, {headers:this.httpOptions});
}

updateProfileImage(userData, id:any){
  return this.http.put(this.backendLink + `api/updateAvatar/${id}/`, userData, {headers: this.httpLogged});
}

updateProfileBio(userData, id:any){
  return this.http.put(this.backendLink + `api/updateBio/${id}/`, userData, {headers: this.httpLogged});
}

getUser_id(){
  return localStorage.getItem('user_id');
}

getWorkerInfo(id){
  return this.http.get(this.backendLink + `api/workers/${id}/`);
}

getUserInfo(id){
  return this.http.get(this.backendLink + `api/users/${id}/`, {headers: this.httpLogged})
}

getComments(param){
  let params = new HttpParams().set('username', param);

  return this.http.get(this.backendLink + 'api/comments/', {params:params})
}

getWorkerUserInfo(username){
  let params = new HttpParams();
    
  params = params.set('username', username);

  return this.http.get(this.backendLink + 'api/workerGet/', {params:params})
}

private setSession(authResult) {
  this.token = authResult['access'];
  this.refreshToken = authResult.refreshToken;
  const payload = this.helper.decodeToken(this.token);
  localStorage.setItem('user_id', payload.user_id);
  console.log(payload);
  localStorage.setItem('token', authResult.access);
  localStorage.setItem('refresh', authResult.refresh);
}

getExpiration() {
  const expiration = localStorage.getItem('expires_at');
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}

commentUser(body, workerId) {
  return this.http.post(this.backendLink + `api/workerProfile/${workerId}/rate_worker/` , body, {headers: this.httpLogged})  
}

logout() {
  localStorage.clear();
  localStorage.removeItem('token');
  this._router.navigateByUrl('');
}


}

