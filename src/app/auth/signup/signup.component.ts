import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  signup(){
    if(this.signupForm.invalid){
      return ;
    }

    this.authService.signUp(this.signupForm.getRawValue()).subscribe((res: any) => {
      swal.fire({
        text: `${res.status}`,
        icon: 'success'
      });
      this.router.navigate(['/auth/account/login']);
    }, (error: any) => {
      swal.fire({
        text: `${error.error.message}`,
        icon: 'error'
      });
    })
  }

}
