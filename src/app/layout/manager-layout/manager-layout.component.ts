import { Component } from '@angular/core';
import { AuthService } from '@app/core/service/auth/auth.service';
import AuthDetail from '@app/data/schema/AuthDetail';
import User from '@app/data/schema/User';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss'],
})
export class ManagerLayoutComponent {
  theme: string = 'light';
  authDetails: AuthDetail;
  todayDate: string = '';

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.authDetails = AuthService.getUserDetails() ?? new AuthDetail();
    let date = new Date();
    this.todayDate = date.toDateString();

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
}
