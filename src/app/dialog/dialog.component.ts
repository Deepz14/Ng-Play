import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshness = ['Brand New', 'Second Hand', 'Refurbished']
  myFilter = new Date()
  constructor() { }

  ngOnInit(): void {
  }

}
