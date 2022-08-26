import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe((res: any) => {
      swal.fire({
        text: `${res.status}`,
        icon: 'success'
      });
      this.router.navigate(['/page']);
    }, (error: any) => {
      swal.fire({
        text: `${error.error.message}`,
        icon: 'error'
      });
    })
  }

}
