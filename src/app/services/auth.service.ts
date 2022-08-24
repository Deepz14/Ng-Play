import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(payload: any){
    return this.http.post('http://localhost:8080/api/auth/signup', payload);
  }

  login(payload: any){
    return this.http.post('http://localhost:8080/api/auth/login', payload);
  }
}
