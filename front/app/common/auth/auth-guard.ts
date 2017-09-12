import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Auth } from './auth-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  /**
   * canActivate Check if user is authenticated, if not, redirect to login
   */
  canActivate() {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
