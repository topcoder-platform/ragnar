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

  constructor(public http: AuthHttp) {}

  /**
   * addUser Add owner to db
   * @param {string} username The username to be added
   */
  addUser(username: string) {
    this.clear();

    this.http.post(apiUrl('users'), {
      username,
      "role": "owner",
      "type": "github",
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
  }
}
