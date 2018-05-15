import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';

import { apiUrl } from 'app/common/api-urls';

@Component({
  selector: 'app-users-page',
  templateUrl: 'users-page.component.html',
  styleUrls: ['users-page.component.css']
})
export class UsersPageComponent {
  public user: any = {};
  public userAdded = false;
  public msg: string = null;
  public error = false;

  constructor(public http: AuthHttp) { }

  /**
   * addUser Add owner to db
   * @param {string} topcoderUsername the topcoder handle of user
   * @param {string} username The username to be added
   * @param {string} type The user type
   */
  addUser(topcoderUsername: string, username: string, type: string) {
    this.clear();
    if (!username || username.length === 0) {
      this.error = true;
      this.msg = 'Missing user topcoder handle.';
      return;
    }
    if (!username || username.length === 0) {
      this.error = true;
      this.msg = 'Missing user name.';
      return;
    }
    if (!type || type.length === 0) {
      this.error = true;
      this.msg = 'Missing user type.';
      return;
    }

    this.http.post(apiUrl('users'), {
      topcoderUsername,
      username,
      "role": "owner",
      type,
    }).subscribe((res) => {
      this.userAdded = true;
      this.user = {};
    }, (err) => {
      const e = err.json();
      this.error = true;
      console.log(e );
      this.msg = e.message;
    });
  }

  /**
   * clear Clear the user-added state
   */
  clear() {
    this.userAdded = false;
    this.msg = null;
    this.error = false;
  }
}
