// services/policy.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../../../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiUrl = 'https://localhost:443/policies'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getPolicyById(id: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createPolicy(policy: Policy, pdfFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('policyNumber', policy.policyNumber.toString());
    formData.append('type', policy.type);
    formData.append('contributor', policy.contributor);
    formData.append('paymentMethod', policy.paymentMethod);
    formData.append('splitType', policy.splitType);
    formData.append('startDate', policy.startDate.toISOString());
    formData.append('endDate', policy.endDate.toISOString());
    formData.append('premiumAmount', policy.premiumAmount.toString());
    formData.append('invoiceAmount', policy.invoiceAmount.toString());
    formData.append('status', policy.status);
    if (policy.policyNotes !== undefined) {
      formData.append('policyNotes', policy.policyNotes);
    }
    formData.append('pdfUrl', pdfFile);

    return this.http.post(`${this.apiUrl}/`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      }
    });
}

  updatePolicy(id: string, policy: Policy): Observable<Policy> {
    return this.http.put<Policy>(`${this.apiUrl}/${id}`, policy, { headers: this.getAuthHeaders() });
  }

  deletePolicy(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  uploadPdf(policyId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);

    return this.http.post(`${this.apiUrl}/${policyId}/upload`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      }),
    });
  }
}
