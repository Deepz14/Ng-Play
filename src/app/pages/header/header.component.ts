import { Component, OnInit, Renderer2 } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  is_toogled: boolean = false;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ontoogle(){
    this.is_toogled = !this.is_toogled;
  }

  onSidebarClick(){
    this.is_toogled = false
  }

}
