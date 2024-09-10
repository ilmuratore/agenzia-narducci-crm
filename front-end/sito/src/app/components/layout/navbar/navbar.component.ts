import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarCollapsed = true;

  theme: 'light' | 'dark' = 'dark';

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'theme-dark');
  }

  toggleTheme() {
    if(this.theme === 'dark') {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  };

  setLightTheme() {
    this.renderer.removeClass(document.body, 'theme-dark');
    this.renderer.addClass(document.body, 'theme-light');
    this.theme = 'light';
  };

  setDarkTheme() {
    this.renderer.removeClass(document.body, 'theme-light');
    this.renderer.addClass(document.body, 'theme-dark');
    this.theme = 'dark';
  };

}

