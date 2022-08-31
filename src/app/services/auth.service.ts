import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.serverApi;
  constructor(private http: HttpClient) { }

  signUp(payload: any){
    return this.http.post(`${this.apiUrl}/auth/signup`, payload);
  }

  login(payload: any){
    return this.http.post(`${this.apiUrl}/auth/login`, payload);
  }
}
