import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ChannelComponent } from './channel/channel.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "playlist", component: PlaylistComponent},
  {path: "channel", component: ChannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
