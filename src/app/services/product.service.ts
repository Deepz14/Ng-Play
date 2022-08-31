import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.serverApi;
  private isProductAdd = new BehaviorSubject(false);
  private productEdited = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get(`${this.apiUrl}/products/`);
  }

  getProductById(pk: any){
    return this.http.get(`${this.apiUrl}/products/${pk}/`);
  }

  addProduct(payload: any){
    let headers = new HttpHeaders({'content-type': 'application/json','Accept': 'application/json'})
    return this.http.post(`${this.apiUrl}/products/`, payload);
  }

  editProduct(pk: any, payload: any){
    return this.http.put(`${this.apiUrl}/products/${pk}/`, payload);
  }

  deleteProduct(pk: any){
    return this.http.delete(`${this.apiUrl}/products/${pk}/`);
  }

  getProductState(){
    return this.isProductAdd.asObservable();
  }

  isProductEdit(){
    return this.productEdited.asObservable();
  }

  addProductState(){
    this.isProductAdd.next(true)
  }

  resetProductState(){
    this.isProductAdd.next(false);
  }

  editProductState(id: any){
    this.productEdited.next(id);
  }

  resetProductEdited(){
    this.productEdited.next(null);
  }
}
