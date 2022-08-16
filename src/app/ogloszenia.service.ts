import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OgloszeniaService implements OnInit{
  ogloszenia;
  httpLogged;
  headerToken;
  token = localStorage.getItem('token');
  constructor(
    private _US:UserService,
    private http:HttpClient
  ) {
    this.httpLogged = new HttpHeaders(
      {
      'Authorization': `Bearer ${this.token}`
      }
    )
   }
   ngOnInit(): void {
     this.token = localStorage.getItem('token');
   }
  private backendLink = 'http://localhost:8000/';

  getCategoryList(){
    return this.http.get( this.backendLink + 'api/categoryList/' , {headers: this.httpLogged})
  }

  getPosts(){
    return this.http.get( this.backendLink + 'api/announcements/');
  }

  sendAnnouncement(body){
    return this.http.post(this.backendLink + 'api/announcements/', body , {headers: this.httpLogged});
  }

  getUserPosts(){
    return this.http.get(this.backendLink + 'api/userPosts/', {headers: this.httpLogged});
  }

  getPost(id){
    return this.http.get(this.backendLink + `api/announcementsShow/${id}`);
  }

  deletePost(id){
    return this.http.delete(this.backendLink + `api/announcements/${id}`, {headers: this.httpLogged})
  }

  updatePost(body, id){
    return this.http.put(this.backendLink + `api/announcements/${id}/`, body, {headers: this.httpLogged})
  }

  getFilteredPosts(cat, tow){
    let params = new HttpParams();
    
    params = params.set('category', cat);

    if(tow){
      params = params.set('town', tow);
    }
    
    // params.set('town', tow);
    return this.http.get('http://localhost:8000/api/allAnnouncements/', {params: params, headers:this.httpLogged})
  }

      // unlogged user calls
  getFilteredPostsUser(cat, tow){
    let params = new HttpParams();
    
    params = params.set('category', cat);

    if(tow){
      params = params.set('town', tow);
    }
    
    // params.set('town', tow);
    return this.http.get('http://localhost:8000/api/allAnnouncements/', {params: params})
  }

  GetMiejscowosc(){
    return this.http.get(this.backendLink + 'api/town/');
  }

  getPostsUser(){
    return this.http.get( this.backendLink + 'api/announcementsShow/');
  }

  getCategoryListUser(){
    return this.http.get( this.backendLink + 'api/categoryList/')
  }
}
