import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit {
  faUser = faUser;
  faStar = faStar;
  imageUrl;
  showImg:boolean = false;
  worker;
  zawod;
  user;
  username;
  fachowiec;
  rateHovered = 0;
  comment;
  Usercomments;
  constructor(
    private _us:UserService,
    private _ar:ActivatedRoute
  ) { 
    this.username = this._ar.snapshot.paramMap.get('username');
    
  }

  ngOnInit(): void {
    this.worker = {
      id:'',
      username:'',
    }
    this.worker.username = this.username;
    this.fachowiec = {
      id:Number,
      bio:'',
      image:File,
      no_of_ratings:Number,
      avg_rating:Number
    }
    this.comment = {
      title:'',
      stars:'',
      commentValue:''
    }

    this._us.getWorkerUserInfo(this.username).subscribe(
      Response =>{
        console.log(Response);
        this.fachowiec = Response[0];
        this.imageUrl = Response['image'];
        console.log('fac', this.fachowiec.id);
      },error =>{
        console.log(error)
      }
    )
    this._us.getComments(this.username).subscribe(
      Response =>{
        this.Usercomments = Response;
        console.log(Response);
      }, error =>{
        console.log(error);
      }
    )
  }

  rateHover(rate){
    this.rateHovered = rate;
  }

  rateClicked(rate){
    this.comment.stars = rate;
  }

  rateWorker(){
    let body = new FormData();
    body.append('stars', this.comment.stars);
    body.append('commentValue', this.comment.commentValue);
    body.append('workerId', this.fachowiec.id);
    body.append('title', this.comment.title);

    return this._us.commentUser(body, this.fachowiec.id).subscribe(
      Response =>{
        alert('Oceniono pomyślnie');
        console.log(Response);
      }, error =>{
        console.log(error);
        alert('Użytkownik został już oceniony lub nie podano oceny');
      }
    )
  }
}
