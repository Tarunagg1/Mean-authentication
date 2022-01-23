import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _BaseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private _router: Router) {}

  registeruser(userData) {
    return this.http.post(`${this._BaseUrl}/register`, userData);
  }

  loginuser(userData) {
    return this.http.post(`${this._BaseUrl}/login`, userData);
  }

  isUserLoginAndTokenExists() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logouUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
