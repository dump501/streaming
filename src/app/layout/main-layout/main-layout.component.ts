import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/service/auth/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import AuthDetail from '@app/data/schema/AuthDetail';
import { logout } from '@app/core/store/authStore/auth.actions';
import {
  isAuthenticated,
  selectAuthDetails,
} from '@app/core/store/authStore/auth.selectors';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  theme: string = 'light';
  authDetails: AuthDetail = new AuthDetail();
  isAuthenticated: boolean = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private authService: AuthService,
    private store: Store<{ auth: AuthDetail }>
  ) {
    this.store.select('auth').subscribe((data) => {
      this.authDetails = data;
    });

    console.log(this.authDetails);

    this.store.select(isAuthenticated).subscribe((data) => {
      this.isAuthenticated = data;
    });
    console.log(this.isAuthenticated);

    // config modal
    config.backdrop = 'static';

    if (localStorage.getItem('theme')) {
      this.setTheme(localStorage.getItem('theme') ?? 'dark');
      return;
    }
    // check if theres is a prefered theme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
      return;
    }
    this.setTheme('light');
  }

  setTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
  }

  selectTheme(theme: string) {
    this.setTheme(theme);
  }

  open(content: any) {
    this.modalService.open(content);
  }

  closeModals() {
    this.modalService.dismissAll();
  }

  logout() {
    this.store.dispatch(logout());
  }

  ngOnInit(): void {
    // this.isAuthenticated = AuthService.isAuthenticated();
    // console.log('is authenticated: ', this.isAuthenticated);
    // this.isAuthenticatedS = this.store.pipe(
    //   select((state) => {
    //     console.log(state);
    //     return false;
    //   })
    // );
  }
}
