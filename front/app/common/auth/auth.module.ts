import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { Auth, getAuthToken, TOKEN_NAME } from './auth-service';
import { AuthGuard } from './auth-guard';

// Auth http service to make authenticated requests to api
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: TOKEN_NAME,
    tokenGetter: getAuthToken,
  }), http, options);
}

const AuthHttpProvider = {
  provide: AuthHttp,
  useFactory: authHttpServiceFactory,
  deps: [Http, RequestOptions]
};

@NgModule({
  providers: [
    AuthGuard,
    Auth,
    AuthHttpProvider,
  ]
})
export class AuthModule {}
