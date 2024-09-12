import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = 'https://localhost:443/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  getClient(_id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${_id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  updateClient(_id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${_id}`, client);
  }

  deleteClient(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${_id}`);
  }
}
