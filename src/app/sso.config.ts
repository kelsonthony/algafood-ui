import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfigAlga: any = {

  issuer: 'http://127.0.0.1:8088',
  redirectUri: window.location.origin,
  clientId: 'algafood-web2',
  password: 'web123',
  responseType: 'code',
  scope: 'READ WRITE openid',
  showDebugInformation: true,
  requireHttps: false,
  customQueryParams: {
    password: 'web123',

  }
};




export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider

  issuer: 'https://idsvr4.azurewebsites.net',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'spa',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email offline_access api',

  showDebugInformation: true,
};

// export const authCodeFlowConfigAlga: AuthConfig = {
//   // URL de autorização (authorize)
//   issuer: 'http://localhost:8088',

//   // URL de redirecionamento após o login
//   redirectUri: 'http://127.0.0.1:4200/home',

//   // Identificador do cliente
//   clientId: 'algafood-web',

//   // Tipo de resposta
//   responseType: 'code',

//   // Escopo
//   scope: 'READ WRITE',

//   // Outras configurações de autenticação, se necessário
// };

// // Função para gerar um estado aleatório
// function generateState(): string {
//   return Math.random().toString(36).substring(2, 15);
// }

// // Lógica de redirecionamento para a página de login
// function redirectToLogin(): void {
//   const state = generateState();
//   // Salve o estado gerado em algum lugar, como localStorage, para validar mais tarde
//   localStorage.setItem('oauth_state', state);

//   // Crie um code challenge
//   const codeChallenge = 'seu-code-challenge-aqui'; // substitua pelo seu código desafio gerado

//   // Construa a URL de autorização com os parâmetros necessários
//   const authorizationUrl = `${authCodeFlowConfigAlga.issuer}?response_type=${authCodeFlowConfigAlga.responseType}&client_id=${authCodeFlowConfigAlga.clientId}&redirect_uri=${authCodeFlowConfigAlga.redirectUri}&scope=${authCodeFlowConfigAlga.scope}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

//   // Redirecione para a URL de autorização
//   window.location.href = authorizationUrl;
// }


