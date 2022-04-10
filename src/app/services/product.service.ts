import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private isProductAdd = new BehaviorSubject(false);
  private productEdited = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get('http://localhost:5000/products/');
  }

  getProductById(pk: any){
    return this.http.get(`http://localhost:5000/products/${pk}/`);
  }

  addProduct(payload: any){
    let headers = new HttpHeaders({'content-type': 'application/json','Accept': 'application/json'})
    return this.http.post('http://localhost:5000/products/', payload);
  }

  editProduct(pk: any, payload: any){
    return this.http.put(`http://localhost:5000/products/${pk}/`, payload);
  }

  deleteProduct(pk: any){
    return this.http.delete(`http://localhost:5000/products/${pk}/`);
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
