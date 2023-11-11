import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/service/auth/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  theme: string = 'light';
  isAuthenticated: boolean = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
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

  ngOnInit(): void {
    this.isAuthenticated = AuthService.isAuthenticated();
    console.log('is authenticated: ', this.isAuthenticated);
  }
}
