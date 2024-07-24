import { AuthConfig, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgafoodApiService {

  constructor(
    private readonly oAuthService: OAuthService,
    private readonly urlHelperService: UrlHelperService
  ) {
    const oAuthConfig: AuthConfig = {
      issuer: 'http://localhost:8088/oauth2/authorize',
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin,
      clientId: 'algafood-web',
      scope: 'READ WRITE',
      responseType: 'code',
    };

    oAuthService.configure(oAuthConfig);
    oAuthService.setupAutomaticSilentRefresh();

    // Chama a função pública para criar o par de desafio e verificador PKCE
    this.createChallangeVerifierPairForPKCE();

    // Inicia o fluxo de login somente se não houver um token de acesso válido
    this.initiateLoginFlow();
  }

  createChallangeVerifierPairForPKCE(): void {
    // Chama o método protegido do OAuthService para criar o par de desafio e verificador PKCE
    (this.oAuthService as any).createChallangeVerifierPairForPKCE();
  }

  initiateLoginFlow(): void {
    // Inicia o fluxo de login somente se não houver um token de acesso válido
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.initLoginFlow();
    } else {
      // Carrega o perfil do usuário se já estiver autenticado
      this.oAuthService.loadUserProfile().then((userProfile) => {
        console.log(JSON.stringify(userProfile));
      });
    }
  }
}
