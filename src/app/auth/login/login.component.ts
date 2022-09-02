import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { GoogleApisService } from 'src/app/services/google-apis.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submit: boolean = false;
  constructor(private authService: AuthService, private router: Router, 
    private google: GoogleApisService, private oAuthService: OAuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get f(): {[key: string]: AbstractControl}{
    return this.loginForm.controls;
  }

  login(){
    this.submit = true;
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

  googleLogin(){
    this.google.googleLogin();
  }

}
