import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     $('#sidebar-toggle').click(function(){
      console.log('clicked');
      $("#collapse-menu").toggleClass("toggled");
    })
  }

}
