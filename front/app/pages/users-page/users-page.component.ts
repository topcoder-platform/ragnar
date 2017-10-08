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

  constructor(public http: AuthHttp) {}

  /**
   * addUser Add owner to db
   * @param {string} username The username to be added
   * @param {string} type The user type
   */
  addUser(username: string, type: string) {
    this.clear();
    if (!username || username.length === 0) {
      this.msg = 'Missing user name.';
      return;
    }
    if (!type || type.length === 0) {
      this.msg = 'Missing user type.';
      return;
    }

    this.http.post(apiUrl('users'), {
      username,
      "role": "owner",
      type,
    }).subscribe((res) => {
      this.userAdded = true;
      this.user = {};
    });
  }

  /**
   * clear Clear the user-added state
   */
  clear() {
    this.userAdded = false;
    this.msg = null;
  }
}
