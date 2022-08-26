import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from '../app-loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements OnInit {

  constructor(public loaderService: AppLoaderService) {
  }

  ngOnInit(): void {
  }

}
