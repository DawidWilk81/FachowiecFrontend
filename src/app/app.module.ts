import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { UnloggedComponent } from './unlogged/unlogged.component';
import { FormsModule } from '@angular/forms';
import { HomeUserComponent } from './home-user/home-user.component';
import { HeaderLoggedComponent } from './header-logged/header-logged.component';
import { RegisterWorkerComponent } from './register-worker/register-worker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatSelectModule} from '@angular/material/select';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { DetailsComponent } from './details/details.component'; 
import { UserService } from './user.service';
import { OgloszeniaService } from './ogloszenia.service';
import { PostChangeComponent } from './post-change/post-change.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';
import { DetailsUnloggedComponent } from './details-unlogged/details-unlogged.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    UnloggedComponent,
    HomeUserComponent,
    HeaderLoggedComponent,
    RegisterWorkerComponent,
    AddAnnouncementComponent,
    UserProfileComponent,
    UserPostsComponent,
    DetailsComponent,
    PostChangeComponent,
    WorkerProfileComponent,
    DetailsUnloggedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [UserService, OgloszeniaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
