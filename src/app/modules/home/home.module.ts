import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PlaylistComponent } from './page/playlist/playlist.component';
import { StreamingComponent } from './page/streaming/streaming.component';
import { LoginComponent } from './page/login/login/login.component';



@NgModule({
  declarations: [
    HomeComponent,
    PlaylistComponent,
    StreamingComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule, HomeRoutingModule
  ]
})
export class HomeModule { }
