import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ChannelListComponent } from './page/channel-list/channel-list.component';
import { ChannelCreateComponent } from './page/channel-create/channel-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistComponent } from './page/playlist/playlist.component';
import { PlaylistCreateComponent } from './page/playlist-create/playlist-create.component';
import { ChannelShowComponent } from './page/channel-show/channel-show.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@app/core/interceptors/auth/auth.interceptor';
import { VideoUploadComponent } from './page/video-upload/video-upload.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChannelListComponent,
    ChannelCreateComponent,
    PlaylistComponent,
    PlaylistCreateComponent,
    ChannelShowComponent,
    VideoUploadComponent,
  ],
  imports: [CommonModule, ManagerRoutingModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class ManagerModule {}
