import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { apiUrl } from 'app/common/api-urls';

/**
 * Github login callback for owners
 */
@Component({
  selector: 'app-github-owner-login',
  template: `
    <div class="container">
      <h3 *ngIf="state.authErr">{{state.authErr}}</h3>
    </div>`,
  styles: [`.container {padding-top: 30px;}`]
})
export class GithubOwnerLoginComponent implements OnInit {
  public state: any = {};

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // subscribe to queryParams and check if there's a state and code params
    // If so, try auth, else redirect to owner page
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let {code, state} = params;
      if(code && state) {
        this.tryAuth(code, state);
      }
    });
  }

  /**
   * tryAuth Try to authenticate the user based on code & state params
   * @param {string} code  from github oAuth
   * @param {string} state from github oAuth
   */
  tryAuth(code: string, state: string) {
    this.http.get(`${apiUrl('githubOwnerLoginCB')}?code=${code}&state=${state}`).subscribe((d) =>
      this.router.navigate(['github-owner']), (err) => {
        const res = err.json();
        // If no user/owner found, show error
        if(res && res.code === 'NOT_FOUND') {
          this.state = {...(this.state), authErr: `User isn't an owner!`};
        } else {
          this.state = {...(this.state), authErr: err};
        }
      });
  }
}
