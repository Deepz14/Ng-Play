import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductService } from '../services/product.service';
import { DataTableDirective } from 'angular-datatables';

export interface ProductData {
  id: string | number;
  prd_name: string;
  category: string;
  date: Date | string;
  prd_frshness: string;
  price: string;
  comment: string
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective
  displayedColumns: string[] = ['id', 'name', 'category', 'date', 'quality', 'price', 'comment', 'actions'];
  dataSource!: MatTableDataSource<any>;
  products: any;
  dtOptions: DataTables.Settings = {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private prdService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();

    this.prdService.getProductState().subscribe((state: any) => {
      if (state){
        this.getProducts();
        this.prdService.resetProductState();
      }
    })
  }

   ngAfterViewInit(): void {
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      responsive: true
    }
  }


  getProducts(){
    this.prdService.getProduct().subscribe((res: any) => {
      this.products = res
       // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
    }, error => {
      console.log(error);
    })
  }

}
