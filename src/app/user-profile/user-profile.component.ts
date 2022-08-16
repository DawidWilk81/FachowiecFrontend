import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  faUser = faUser;
  imageUrl;
  showImg:boolean = false;
  worker;
  zawod;
  userId;
  constructor(
    private _us:UserService
  ) { 
    this.userId = this._us.getUser_id();
  }

  ngOnInit(): void {
    this.worker = {
      id:'',
      username:'',
      bio:'Jestem najlepszym fachowcem',
      profileImage:File,
      category:''
    }
    this._us.getWorkerInfo(this.userId).subscribe(
      Response =>{
        this.worker = Response["fachowiec"];
        this.imageUrl = Response["fachowiec"].image;
      },error =>{
        console.log(error)
      }
    )
  }

  onImageChange(event:any){
    this.worker.profileImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      if(!this.imageUrl){
        this.showImg = !this.showImg;
      }
      this.imageUrl = event.target.result;
    }
    console.log(this.worker.profileImage);
  }


  updateProfile(){
    if(this.worker.profileImage){
      this.updateProfileImage();
    }
    this.updateProfileBio();

  }

  updateProfileBio(){
    return this._us.updateProfileBio({bio:this.worker.bio, id:this.worker.id},  this.worker.id).subscribe(
      Response=>{
        console.log(Response);
      }
    ),error =>{
      console.log(error);
    }
  }
  updateProfileImage(){
    let body = new FormData;
    body.append('image', this.worker.profileImage);
    body.append('id', this.worker.id);
    return this._us.updateProfileImage(body, this.worker.id).subscribe(
      Response=>{
        console.log(Response);
        alert('Wprowadzono zmiany do systemu.');
      }
    ), error =>{
      console.log(error);
    }
  }
}
