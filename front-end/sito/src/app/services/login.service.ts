import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:443/auth/login'; // URL del tuo endpoint di login

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<{ token: string }>(this.apiUrl, body, { headers })
      .pipe(
        catchError(error => {
          // Gestione degli errori
          console.error('Login error:', error);
          return throwError(() => new Error('Login failed'));
        })
      );
  }


  logout(): void {
    // Rimuovi il token JWT dal sessionStorage
    sessionStorage.removeItem('authToken');
  }
}

