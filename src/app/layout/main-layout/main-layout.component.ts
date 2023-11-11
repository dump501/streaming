import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  theme: string = 'light';

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
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
}
