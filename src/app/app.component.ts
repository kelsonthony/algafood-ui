import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  userName: string = '';


  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
    this.configureOAuth();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.loggedIn = true;
        this.userName = this.oauthService.getIdentityClaims()['preferred_username'];
      }
    });
  }

  configureOAuth() {
    const urlRedirect: string = 'http://127.0.0.1:4200';
    const authConfig: AuthConfig = {
      issuer: 'http://127.0.0.1:8088',
      redirectUri: urlRedirect,
      clientId: 'algafood-web',
      responseType: 'code',
      requireHttps: false,
      scope: 'READ WRITE',
      showDebugInformation: true // Change to false in production
    };

    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  initAuth() {
    this.configureOAuth();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.loggedIn = true;
        this.userName = this.oauthService.getIdentityClaims()['preferred_username'];
      }
    });
  }

  login()  {
    //this.configureOAuth();
    //this.initAuth();
    const state = 'abc1234'; // Definindo um valor fixo para o state
    this.oauthService.state = state; // Definindo o valor do state manualmente
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
}
