// services/api/policy/policy.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../../../models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private baseUrl = 'https://localhost:443/policies';


  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getPolicy(id: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createPolicy(formData: FormData): Observable<Policy> {
    return this.http.post<Policy>(this.baseUrl, formData, { headers: this.getAuthHeaders() });
  }

  updatePolicy(id: string, formData: FormData): Observable<Policy> {
    return this.http.put<Policy>(`${this.baseUrl}/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  deletePolicy(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  
}
