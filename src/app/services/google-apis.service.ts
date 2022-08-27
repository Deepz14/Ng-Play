import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuth: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin + '/page',
    clientId: '605596140214-uv9g45dftahugog1n1e5t21tjohoiaq5.apps.googleusercontent.com',
    scope: 'openid profile email',
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApisService {

   constructor(private readonly oAuthService: OAuthService, private router: Router) {
    oAuthService.configure(oAuth)
    oAuthService.logoutUrl = 'https://www.google.com/accounts/logout'
   }

   googleLogin(){
    this.oAuthService.loadDiscoveryDocument().then(() => {
        this.oAuthService.tryLoginImplicitFlow().then(() => {
            if(!this.oAuthService.hasValidAccessToken()){
                this.oAuthService.initLoginFlow();
            }else{
                this.oAuthService.loadUserProfile().then((userProfile) => {
                    console.log(JSON.stringify(userProfile));
                    this.router.navigate(['/page']);
                    
                })
            }
        })
    })
   }

   isLoggedIn(){
    return this.oAuthService.hasValidAccessToken();
   }

   logout(){
    this.oAuthService.logOut();
   }
}
