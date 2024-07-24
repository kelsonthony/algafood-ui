import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { AlgafoodApiService } from '../../services/algafood-api.service';
import { authCodeFlowConfig, authCodeFlowConfigAlga } from '../../sso.config';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private oAuthService: OAuthService
    ) {
    //this.configureSingleSignOn();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      //const state = 'abc123';
      if (code && state) {
        // Use o state como code_verifier
        console.log('code', code);

        console.log('state', state);
        this.authenticateWithCode(code, state);
      }
    });
  }

  authenticateWithCode(code: string, state: string): void {

    const codeVerifier = state;



    const tokenRequest = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://127.0.0.1:4200/',
      code_verifier: codeVerifier
    };
    console.log('tokenRequest', tokenRequest);

    // this.http.post<string>('http://127.0.0.1:8088/oauth2/token', tokenRequest)
    // .pipe(
    //   tap(response => {
    //     console.log('Token de acesso:', response);
    //   }),
    //   catchError(error => {
    //     console.error('Erro ao obter token de acesso:', error);
    //     return of(null); // Retornando um observable vazio ou algum valor padrão em caso de erro
    //   })
    // )
    // .subscribe();

  }


  configureSingleSignOn() {
    //this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.configure(authCodeFlowConfigAlga);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }


  redirectToLogin(): void {
    this.oAuthService.initImplicitFlow();
    this.configureSingleSignOn();

  }

  redirectToLogout(): void {
    this.oAuthService.logOut();
  }

  generateCodeVerifier(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      codeVerifier += charset.charAt(randomIndex);
    }
    return codeVerifier;
  }

  sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  base64urlencode(arrayBuffer: ArrayBuffer): string {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  generateCodeChallenge(codeVerifier: string): Promise<string> {
    return this.sha256(codeVerifier)
      .then(buffer => this.base64urlencode(buffer));
  }

  // get token() {
  //   let claims: any = this.oAuthService.getIdentityClaims();
  //   console.log('claims: ', claims);
  //   return claims ? claims : null;
  // }

}
