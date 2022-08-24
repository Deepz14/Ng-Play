import { Component, ElementRef, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  freshness = ['Brand New', 'Second Hand', 'Refurbished']
  myFilter = new Date();
  editPrdSubs = new Subscription();
  dialogSubs = new Subscription();
  pk: any

  @ViewChild('closeBtn') btnRef!: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string}, 
  private fb: FormBuilder, 
  private prdService: ProductService,
  private dialog: MatDialog, 
  public dialogRef: MatDialogRef<DialogComponent>) { }

  productForm = this.fb.group({
    name: new FormControl(''),
    category: new FormControl(''),
    date: new FormControl(''),
    quality: new FormControl('Brand New'),
    price: new FormControl(''),
    comment: new FormControl()
  })

  ngOnInit(): void {
    this.editPrdSubs = this.prdService.isProductEdit().subscribe((state: any) => {
      if(state){
        this.pk = state
        this.getindividualProduct(state)
        this.prdService.resetProductEdited();
      }
  })


  this.dialogSubs = this.dialogRef.afterClosed().subscribe(result => {
      this.prdService.resetProductEdited();
    })
  }

  addProduct(){
    this.prdService.addProduct(this.productForm.getRawValue()).subscribe((res: any) => {
      this.prdService.addProductState();
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })
  }

  getindividualProduct(state: any){
    this.prdService.getProductById(state).subscribe((res: any) => {
         this.productForm.patchValue({
            name: res.name,
            category: res.category,
            date: res.date,
            quality: res.quality,
            price: res.price,
            comment: res.comment
         })
    })
  }

  editProduct(){
    this.prdService.editProduct(this.pk, this.productForm.getRawValue()).subscribe((res: any) => {
      this.prdService.addProductState();
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy(): void {
    this.editPrdSubs.unsubscribe();
    this.dialogSubs.unsubscribe();
  }

}
