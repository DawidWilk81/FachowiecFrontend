import { Component, OnInit, Renderer2 } from '@angular/core';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { OgloszeniaService } from '../ogloszenia.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  arrowDown = faArrowCircleDown;
  iconClicked = false;
  kategorie;
  categoryId;
  //Pagination
  ogloszenia:any;
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
    this._OS.getPosts().subscribe(
      Response =>{
        this.ogloszenia = Response;
        this.ogloszeniaLen = this.ogloszenia.length;
        console.log(Response);
      }, 
      error =>{
      console.log(error);
    })
    this._OS.GetMiejscowosc().subscribe(
      Response =>{
        this.options = Response;
        console.log(Response);
      }
    )
    this._OS.getCategoryList().subscribe(
      Response =>{
        this.kategorie = Response;
        console.log(this.kategorie);
      },error =>{
        console.log(error);
      }
      
    )
  }

  ngOnInit(): void {
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
     this.tag2 = event.nazwa;
    
   }
   Inp(){
    return this._OS.getFilteredPosts(this.tag2, this.tag).subscribe(
      Response =>{
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
        this.ogloszeniaLen = this.ogloszenia.length;
      }, error =>{
        console.log(error);
      }
    )
   }
}
