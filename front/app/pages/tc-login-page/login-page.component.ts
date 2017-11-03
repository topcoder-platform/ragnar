import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Auth } from 'app/common/auth/auth-service';

@Component({
  selector: 'app-tc-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.css']
})
export class TCLoginPageComponent {
  public user: any = {};
  public loginError = '';

  constructor(private auth: Auth, private router: Router) {}

  /**
   * login
   * @param {string} username User username
   * @param {string} password User password
   */
  login(username: string, password: string) {
    this.clear();
    if (!username || username.length === 0) {
      this.loginError = 'Missing user name.';
      return;
    }
    if (!password || password.length === 0) {
      this.loginError = 'Missing password.';
      return;
    }

    this.auth.tcLogin(username, password)
      .subscribe((data) => {
        window.location.href = data.returnUrl;
      }, (r) => {
        this.loginError = 'Invalid username and/or password!';
      });
  }

  /**
   * clear Clear login errors
   */
  clear() {
    this.loginError = '';
  }
}
