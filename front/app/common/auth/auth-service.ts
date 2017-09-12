import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { apiUrl } from 'app/common/api-urls';

// Define a name for the stored auth token
export const TOKEN_NAME = 'auth:token';
// Define a getter for the auth token
export const getAuthToken = (() => sessionStorage.getItem(TOKEN_NAME));

@Injectable()
export class Auth {
  constructor(private http: Http) {}

  /**
   * setToken Store an auth token
   * @param {string} token The auth token
   */
  setToken(token: string) {
    sessionStorage.setItem(TOKEN_NAME, token);
  }

  /**
   * loggedIn Check if user is logged in
   * @returns {boolean}
   */
	loggedIn() {
	  return tokenNotExpired(TOKEN_NAME, getAuthToken());
	}

  /**
   * login Login user based on username & password
   * @param {string} username
   * @param {string} password
   */
  login(username: string, password: string) {
    return this.http.post(apiUrl('admin'), {username, password})
      .map((res: Response) => res.json())
      .map((data) => (this.setToken(data.token), {success: true}));
  }
}
