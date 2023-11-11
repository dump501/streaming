import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { UploadComponent } from './upload/upload.component';
import { ManagerModule } from '@modules/manager/manager.module';
import { DashboardComponent } from './modules/manager/page/dashboard/dashboard.component';
import { ChannelListComponent } from './modules/manager/page/channel-list/channel-list.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: 'manager',
    component: ManagerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/manager/manager.module').then(
            (m) => m.ManagerModule
          ),
      },
    ],
  },
  {
    path: '**',
    component: UploadComponent,
  },
  // {
  //   path: 'upload',
  //   component: UploadComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
