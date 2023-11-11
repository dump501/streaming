import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ChannelListComponent } from './page/channel-list/channel-list.component';
import { ChannelCreateComponent } from './page/channel-create/channel-create.component';

@NgModule({
  declarations: [DashboardComponent, ChannelListComponent, ChannelCreateComponent],
  imports: [CommonModule, ManagerRoutingModule],
})
export class ManagerModule {}
