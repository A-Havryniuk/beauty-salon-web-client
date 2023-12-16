import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5159';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = {email, password};

    return this.http.post<any>(`${this.apiUrl}/login-admin`, credentials);
  }

  setAuthToken(token: string):void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken():string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
