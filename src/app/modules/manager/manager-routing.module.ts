import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ChannelListComponent } from './page/channel-list/channel-list.component';
import { ChannelCreateComponent } from './page/channel-create/channel-create.component';
import { ChannelShowComponent } from './page/channel-show/channel-show.component';
import { PlaylistCreateComponent } from './page/playlist-create/playlist-create.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'channel',
    component: ChannelListComponent,
  },
  {
    path: 'channel/create',
    component: ChannelCreateComponent,
  },
  {
    path: 'channel/show',
    component: ChannelShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
