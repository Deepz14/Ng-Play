import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private authService: AuthService) { }

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
      console.log('response', res);
    }, (error: any) => {
      console.log('Error: ', error);
    })
  }

}
