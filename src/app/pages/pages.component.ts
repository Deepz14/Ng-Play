import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#sidebar-toggle').click(function(){
      console.log('clicked');
      // $("#wrapper").toggleClass("toggled");
    })
  }

}
