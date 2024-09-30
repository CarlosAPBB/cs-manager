import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';
  private tokenKey = 'jwt_token';

  constructor(
    private http: HttpClient
  ) { }

  register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || null;
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  get isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
}

