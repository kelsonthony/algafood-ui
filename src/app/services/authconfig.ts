  export const authConfig  = {
    issuer: 'http://127.0.0.1:8088/oauth2/authorize',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin + '/',
    clientId: 'algafood-web',
    clientSecret: 'web123',
    scope: 'READ WRITE',
    responseType: 'code',
    requireHttps: false
  };


// export const authConfig = {
//   issuer: 'https://auth.example.com',
//   redirectUri: window.location.origin + '/login/callback',
//   clientId: 'your-client-id',
//   responseType: 'code',
//   scope: 'openid profile email',
//   showDebugInformation: true
// };


  // const oAuthConfig: AuthConfig = {
  //   issuer: 'http://localhost:8088/oauth2/authorize',
  //   strictDiscoveryDocumentValidation: false,
  //   redirectUri: window.location.origin,
  //   clientId: 'algafood-web',
  //   scope: 'READ WRITE',
  //   responseType: 'code',
  // };
