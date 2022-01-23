import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _BaseUrl = "http://localhost:8000/api";

  constructor(private http:HttpClient) { }

  accessPrivateRoute(){
    return this.http.get(`${this._BaseUrl}/private`);
  }
}
