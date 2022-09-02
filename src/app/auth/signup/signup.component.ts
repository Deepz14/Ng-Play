import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleApisService } from 'src/app/services/google-apis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submit: boolean = false;
  constructor(private authService: AuthService, 
      private router: Router, private google: GoogleApisService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get f(): {[key: string]: AbstractControl}{
    return this.signupForm.controls;
  }

  signup(){
    this.submit = true;
    if(this.signupForm.invalid){
      return ;
    }

    this.authService.signUp(this.signupForm.getRawValue()).subscribe((res: any) => {
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
