import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Auth } from 'app/common/auth/auth-service';
import { apiUrl } from 'app/common/api-urls';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.css']
})
export class LoginPageComponent {
  public user: any = {};
  public loginError = '';

  constructor(private auth: Auth, private router: Router) {}

  /**
   * login Try to login an admin user based on username & password
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

    this.auth.login(username, password)
      .subscribe((d) => d.success && this.router.navigate(['/users']), (r) => {
        const err = r.json();

        // match username/password errors and display error
        if(err && ['UNAUTHORIZED', 'NOT_FOUND'].indexOf(err.code) > -1) {
          this.loginError = 'Invalid username and/or password!';
        }
      });
  }

  /**
   * clear Clear login errors
   */
  clear() {
    this.loginError = '';
  }

  /**
   * Github login
   */
  loginGithub() {
    window.location.href = apiUrl('githubOwnerLogin');
  }

  /**
   * Gitlab login
   */
  loginGitlab() {
    window.location.href = apiUrl('gitlabOwnerLogin');
  }
}
