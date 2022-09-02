import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApisService } from 'src/app/services/google-apis.service';

declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  is_toogled: boolean = false;
  show_userdropdown: boolean = false;
  constructor(private router: Router,
    private googleService: GoogleApisService ) { }

  ngOnInit(): void {
  }

  ontoogle(){
    this.is_toogled = !this.is_toogled;
  }
  
  onUserDropDown(){
    this.show_userdropdown = !this.show_userdropdown;
  }

  onSidebarClick(){
    this.is_toogled = false
  }

  logout(){
    this.googleService.logout();
    this.router.navigate(['/auth/account/login']);
  }

}
