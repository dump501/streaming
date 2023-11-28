import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { UploadComponent } from './upload/upload.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './shared/components/register/register.component';
import { LoginComponent } from './shared/components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './core/store/counter/counter.reducer';
import { CounterComponent } from './counter/counter.component';
import { authReducer } from './core/store/authStore/auth.reducer';
import { dataReducer } from './core/store/dataStore/data.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    ManagerLayoutComponent,
    UploadComponent,
    RegisterComponent,
    LoginComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      count: counterReducer,
      auth: authReducer,
      data: dataReducer,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
