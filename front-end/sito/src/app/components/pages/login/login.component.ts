import { Component } from '@angular/core';
import { AuthService } from '../../../services/guards/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.authService.login(this.username, this.password)) {
      this.errorMessage = 'Credenziali errate. Riprova.';
    }
  }
}
