import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path: "",
  component: MainLayoutComponent, children: [
    {
      path: "",
      loadChildren: ()=> import('@modules/home/home.module').then(m => m.HomeModule)
    },
  ]},
  {
    path: "manager",
    component: ManagerLayoutComponent
  },
  {
    path: "upload",
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
