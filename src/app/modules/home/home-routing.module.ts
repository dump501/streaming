import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./page/home/home.component";
import { NgModule } from "@angular/core";
import { PlaylistComponent } from "./page/playlist/playlist.component";
import { StreamingComponent } from "./page/streaming/streaming.component";

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'playlist',
    component: PlaylistComponent
  },
  {
    path: 'stream',
    component: StreamingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
