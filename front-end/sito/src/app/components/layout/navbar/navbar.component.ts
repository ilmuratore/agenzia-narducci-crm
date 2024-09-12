import { Component, Renderer2, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css' 
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  theme: 'light' | 'dark' = 'dark';

  constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    // Imposta il tema iniziale in base alla preferenza salvata
    const savedTheme = sessionStorage.getItem('theme') || 'dark';
    this.theme = savedTheme as 'light' | 'dark';
    this.applyTheme(this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
  }

  applyTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      this.renderer.removeClass(document.body, 'theme-light');
      this.renderer.addClass(document.body, 'theme-dark');
    } else {
      this.renderer.removeClass(document.body, 'theme-dark');
      this.renderer.addClass(document.body, 'theme-light');
    }
    sessionStorage.setItem('theme', theme);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
