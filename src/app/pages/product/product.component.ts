import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ProductService } from '../../services/product.service';
import { Fakedb } from 'src/app/services/fakedb';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'quality', 'price', 'comment', 'actions'];
  products: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private prdService: ProductService, private db: Fakedb) { }

  ngOnInit(): void {
    // this.getProducts();
    this.setDataSource(this.db.products);
    // this.prdService.getProductState().subscribe((state: any) => {
    //   if (state){
    //     this.getProducts();
    //     this.prdService.resetProductState();
    //   }
    // })
  }

  getProducts(){
    this.prdService.getProduct().subscribe((res: any) => {
      this.products = res.products
       // Assign the data to the data source for the table to render
    })
  }

  setDataSource(data){
    this.dataSource = new MatTableDataSource(data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {title: 'Add'}
    });
  }

  editProduct(rowId: any){
    this.prdService.editProductState(rowId);
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {title: 'Edit'}
    })
  }

  deleteProduct(rowId: any){
    this.prdService.deleteProduct(rowId).subscribe((res: any) => {
      this.prdService.addProductState();
    }, (error) => {
      console.log(error);
    })
  }
}
