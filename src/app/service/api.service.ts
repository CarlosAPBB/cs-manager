import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  initial(): Observable<any> {
    return this.http.get(`${this.baseUrl}/config/initial`);
  }

  getContractForSigning(contractId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contracts/${contractId}/for-signing`);
  }

  getContracts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contracts`);
  }

  uploadContract(document: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/contracts/upload`, document);
  }

  signContract(contractId: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contracts/${contractId}/sign`, data);
  }

  downloadContract(contractId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contracts/${contractId}/download`, { responseType: 'blob' as 'json' });
  }

  downloadSignedContract(contractId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contracts/${contractId}/download/signed`, { responseType: 'blob' as 'json' });
  }

  downloadContractSignature(contractId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contracts/${contractId}/download/signature`, { responseType: 'blob' as 'json' });
  }

  rejectContract(contractId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/contracts/${contractId}`, {});
  }
}
