import { Component } from '@angular/core';
import { AuthService } from './services/guards/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sito';

  constructor(public authService: AuthService) {}
}
