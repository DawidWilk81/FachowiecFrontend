import { Component, OnInit } from '@angular/core';
import { OgloszeniaService } from '../ogloszenia.service';
import { UserService } from '../user.service';
import { faXmark, faPencil, faHourglass } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  //icons
  xmark = faXmark;
  pencil = faPencil;
  timer = faHourglass;

  ogloszenia;
  user;
  user_id = localStorage.getItem('user_id');
  profile;
  imageUrl;
  warning = false;
  idClicked;
  constructor(
    private _OS:OgloszeniaService,
    private _US:UserService
  ) { 
    this._OS.getUserPosts().subscribe(
      Response =>{
        this.ogloszenia = Response;
        this._US.getWorkerInfo(this.user_id).subscribe(
          Response =>{
            this.user = Response;
            this.profile = Response['fachowiec'];
            this.imageUrl = this.profile.image; 
          }, error =>{
            console.log(error);
          }
        )
        
      },error =>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }
  stop(ogloszenie){
    console.log(ogloszenie.id);
  }
  change(ogloszenie){
    console.log(ogloszenie.id);
  }
  delete(){
    this._OS.deletePost(this.idClicked).subscribe(
      Response => {
        alert('Ogłoszenie zostało usunięte');
        this.warning = !this.warning;
      }, error => {
        console.log(error);
      }
    );
    console.log(this.idClicked);
  }
  showWarning(ogloszenie){
    this.idClicked = ogloszenie.id;
    this.warning = !this.warning;
  }
  closeWarning(){
    this.warning = !this.warning;
  }
}
