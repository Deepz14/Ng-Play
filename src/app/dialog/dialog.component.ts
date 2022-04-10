import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshness = ['Brand New', 'Second Hand', 'Refurbished']
  myFilter = new Date();

  constructor(private fb: FormBuilder, private prdService: ProductService) { }
  productForm = this.fb.group({
    name: new FormControl(''),
    category: new FormControl(''),
    date: new FormControl(''),
    quality: new FormControl('Brand New'),
    price: new FormControl(''),
    comment: new FormControl()
  })

  ngOnInit(): void {
  }

  addProduct(){
    this.prdService.addProduct(this.productForm.getRawValue()).subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

}
