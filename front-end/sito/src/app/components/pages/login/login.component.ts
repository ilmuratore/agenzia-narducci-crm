import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Memorizza il token JWT nel sessionStorage
        sessionStorage.setItem('authToken', response.token);
        // Naviga verso la dashboard o altra pagina
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
