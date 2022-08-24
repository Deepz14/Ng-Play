import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {path: '', redirectTo: 'account', pathMatch: 'full'},
    {
        path: 'account', 
        component: AuthComponent, 
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
            {path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
    }
]

@NgModule({
    declarations: [AuthComponent, LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ]
})

export class AuthModule {}