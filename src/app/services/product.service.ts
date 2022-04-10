import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get('http://localhost:5000/products/');
  }

  addProduct(payload: any){
    let headers = new HttpHeaders({'content-type': 'application/json','Accept': 'application/json'})
    return this.http.post('http://localhost:5000/products/', payload);
  }
}
