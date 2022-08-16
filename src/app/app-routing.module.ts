import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UnloggedComponent } from './unlogged/unlogged.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { RegisterWorkerComponent } from './register-worker/register-worker.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostChangeComponent } from './post-change/post-change.component';
import { DetailsComponent } from './details/details.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';
import { DetailsUnloggedComponent } from './details-unlogged/details-unlogged.component';
const routes: Routes = [
  {path: '', component: UnloggedComponent},
  {path: 'post/:id', component: DetailsUnloggedComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/worker', component: RegisterWorkerComponent},
  {path: 'profile/:username', component: WorkerProfileComponent},
  {path: 'home/dodaj', component: AddAnnouncementComponent},
  {path: 'home/mojeKonto', component: UserProfileComponent},
  {path: 'home/mojeOgloszenia', component: UserPostsComponent},
  {path: 'home/mojeOgloszenia/:id', component: PostChangeComponent},
  {path: 'home', component:HomeUserComponent},
  {path: 'home/:id', component:DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
