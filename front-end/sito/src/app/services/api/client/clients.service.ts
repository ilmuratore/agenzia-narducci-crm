// services/api/client/clients.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = 'https://localhost:443/clients'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client, { headers: this.getAuthHeaders() });
  }

  updateClient(id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client, { headers: this.getAuthHeaders() });
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
