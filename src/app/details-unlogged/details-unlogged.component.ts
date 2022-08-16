import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OgloszeniaService } from '../ogloszenia.service';
import { UserService } from '../user.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-details-unlogged',
  templateUrl: './details-unlogged.component.html',
  styleUrls: ['./details-unlogged.component.scss']
})
export class DetailsUnloggedComponent implements OnInit {
  id:any;
  ogloszenieClicked;
  user:any;
  userId:any;
  imageUrl;
  username;
  faStar = faStar;
  check = localStorage.getItem('token');
  loginCard = true;
  constructor(
    private _router:ActivatedRoute,
    private _OS:OgloszeniaService,
    private _US:UserService
  ) { }

  ngOnInit(): void {

    this.ogloszenieClicked = {
      title:'',
      category:'',
      desc:'',
      phone:'',
      town:'',
      image:'',
    }
    this.user ={
      bio:'',
      rating:'',
      image:'',
      is_worker:Boolean,
      no_of_ratings:Number,
      avg_rating:Number
    }
    this.id = this._router.snapshot.paramMap.get('id');
    this._OS.getPost(this.id).subscribe(
      Response=>{
        this.ogloszenieClicked = Response;
        this.userId = Response['user'];
        this._US.getWorkerInfo(this.userId).subscribe(
          Response =>{
            this.user = Response['fachowiec'];
            this.username = Response['username'];
            console.log(this.user);
          },error=>{console.log(error)}
        )
        console.table(Response);
      },error =>{
        console.log(error)
      }
    )

  }
  loginCardShow(){
    this.loginCard = !this.loginCard;
  }
}
