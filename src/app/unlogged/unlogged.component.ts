import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../user.service';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { OgloszeniaService } from '../ogloszenia.service';
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-unlogged',
  templateUrl: './unlogged.component.html',
  styleUrls: ['./unlogged.component.scss']
})
export class UnloggedComponent implements OnInit {
  loginCard = false
  arrowDown = faArrowCircleDown;
  iconClicked = false;
  kategorie;
  categoryId;
  //Pagination
  ogloszenia;
  ogloszeniaLen;
  page:Number=1;
  checkTown;
  myControl = new FormControl('');
  options;
  filteredOptions: Observable<string[]>;
  tag;
  tag2;
  tab;
  constructor(
    private _renderer:Renderer2,
    private _OS:OgloszeniaService,
    private _router:Router,
    private _routerA:ActivatedRoute,
    private _http:HttpClient
  ) { 
    this.options ={
      town:''
    }
  }

  ngOnInit(): void {
    this._OS.GetMiejscowosc().subscribe(
      Response =>{
        this.options = Response;
        console.log(Response);
      }
    )
    this._OS.getCategoryListUser().subscribe(
      Response =>{
        this.kategorie = Response;
        console.log(this.kategorie);
      },error =>{
        console.log(error);
      }
      
    )

    this._OS.getPostsUser().subscribe(
      Response =>{
        this.ogloszenia = Response;
        this.ogloszeniaLen = this.ogloszenia.length;
        console.log(Response);
      }, 
      error =>{
      console.log(error);
    })
    this._routerA.paramMap.subscribe((params:ParamMap)=>{
      this.categoryId = +params.get('categoryId');
    })
  }
   animateCategory(){
     
     const parent:HTMLElement = document.getElementById("categoryCont");
     const icon = parent.children[1];
     if(this.iconClicked){
       this.iconClicked = !this.iconClicked;
      this._renderer.setStyle(icon, 'transform', 'rotateX(0)');
      this._renderer.setStyle(parent, 'height', '25vh');
     }else{
      this._renderer.setStyle(icon, 'transform', 'rotateX(180deg)');
      this._renderer.setStyle(parent, 'height', '40vh');
      
      this.iconClicked = !this.iconClicked;
     }

   }
   navigate(id){
     this._router.navigateByUrl(`ogloszenie/${id}`);
   }

   check(event){
     console.log(event.nazwa);
     this.tag2 = event.nazwa;
    
   }
   Inp(){
    return this._OS.getFilteredPostsUser(this.tag2, this.tag).subscribe(
      Response =>{
        console.log(Response);
        this.ogloszenia = Response;
        this.ogloszeniaLen = this.ogloszenia.length;
      }, error =>{
        console.log(error);
      }
     )
   }

   townChange(event){
    console.log(event.value);
    this.tag = event.value;
   }
   clearParams(){
    this._OS.getPosts().subscribe(
      Response =>{
        this.ogloszenia = Response;
        this.tag = '';
        this.tag2 = '';
      }, error =>{
        console.log(error);
      }
    )
    }
  showLoginCard(){
    this.loginCard = !this.loginCard;
  }
  
}
