import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OgloszeniaService } from '../ogloszenia.service';
import { UserService } from '../user.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
faStar = faStar;
imageUrl;
  //kategorie
zawody;
wybranyZawod;
  //zmienne profilu uzytkownika
username;
avg_rating
profile = {
  
};
user_id;
image;
id;
  //zmienne z ogloszenia
ogloszenie;

//lapanie inputow
tytulInput;
opisInput;
miejscowoscInput;
numerInput;
kategorieInput;
  constructor(
    private _OS: OgloszeniaService,
    private _US:UserService,
    private _AS:OgloszeniaService,
    private _renderer:Renderer2,
    private _router:ActivatedRoute,
    private _routerChange:Router
  ) { 
    this.user_id = this._US.getUser_id();

  }
  choice(value){
    console.log(value.nazwa);
    this.ogloszenie.category = value.nazwa;
  }
  
  ngOnInit(): void {
    this.ogloszenie = {
      title:'',
      category:'',
      desc:'',
      phone:'',
      town:'',
      image:File
    }
      this.id = this._router.snapshot.paramMap.get('id');
      if(this.id){
        this._OS.getPost(this.id).subscribe(
          Response =>{
            this.ogloszenie = Response;
          }, error =>{
            console.log(error);
          }
        );
      }


    //lapanie inputow
    const Form: HTMLElement = document.getElementById('announcementForm');
    const tytulCONT = Form.children[0];
    const descCont = Form.children[1];
    const townCont = Form.children[2];
    const phoneCont = Form.children[3];
    const categoryCont = Form.children[4];
    this.tytulInput = tytulCONT.children[1];
    this.opisInput = descCont.children[1];
    this.miejscowoscInput = townCont.children[1];
    this.numerInput = phoneCont.children[2];
    this.kategorieInput = categoryCont.children[0];


    this._OS.getCategoryList().subscribe(
      Response =>{
        this.zawody = Response;
        console.log(Response);
      }, error =>{
        console.log(error);
      }
    )
    this._US.getWorkerInfo(this.user_id).subscribe(
      Response =>{
        this.username = Response['username'];
        this.profile = Response['fachowiec'];
        console.log(this.profile);
        this.avg_rating = this.profile['avg_rating'];
        this.image = this.profile['image'];
        // console.log('serer');
      }, error =>{
        console.log(error);
      }
    )

  }

  clear(){
    this._renderer.setStyle(this.tytulInput, 'border', 'none');
    this._renderer.setStyle(this.opisInput, 'border', 'none');
    this._renderer.setStyle(this.miejscowoscInput, 'border', 'none');
    this._renderer.setStyle(this.kategorieInput, 'border', 'none');
    this._renderer.setStyle(this.numerInput, 'border', 'none');
  }

  
  onImageChange(event:any){
    this.ogloszenie.image = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.imageUrl = event.target.result;
    }
  }

  sendAnnouncement(){
    let body = new FormData
    body.append('title', this.ogloszenie.title);
    body.append('desc', this.ogloszenie.desc);
    body.append('category', this.ogloszenie.category);
    body.append('phone', this.ogloszenie.phone);
    body.append('town', this.ogloszenie.town);
    body.append('user', this.user_id)
    body.append('image', this.ogloszenie.image)
    this.clear();
    if(this.ogloszenie.title.length == 0 || this.ogloszenie.title.length >= 254 ){
      console.log(this.ogloszenie.title.length)
      this._renderer.setStyle(this.tytulInput, 'border', '3px solid red');
    }else if(this.ogloszenie.desc.length == 0 || this.ogloszenie.desc.length >= 3600){
      this._renderer.setStyle(this.opisInput, 'border', '3px solid red');
    }else if(this.ogloszenie.town.length == 0 || this.ogloszenie.town.length >= 100){
      this._renderer.setStyle(this.miejscowoscInput, 'border', '3px solid red');
    }else if(this.ogloszenie.phone.length == 0 || this.ogloszenie.phone.length > 9   ){
      this._renderer.setStyle(this.numerInput, 'border', '3px solid red');
    }else if(this.ogloszenie.category.length == 0){
      this._renderer.setStyle(this.kategorieInput, 'border', '3px solid red');
    }else{
      return this._AS.sendAnnouncement(body).subscribe(
        Response =>{
          alert('Dodano ogłoszenie');
          this._routerChange.navigateByUrl('home');
        }, error =>{
          console.log(error);
        }
      )
    }
  }
}
