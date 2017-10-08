import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { apiUrl } from 'app/common/api-urls';

@Component({
  selector: 'app-github-owner-page',
  templateUrl: 'owner-page.component.html',
  styleUrls: ['owner-page.component.css']
})
export class GithubOwnerPageComponent implements OnInit {
  public state: any = {teams: [], ready: false, links: {}, page: 1, lastPage: 1};
  public errorMsg: string = null;

  constructor(private http: Http) { }

  ngOnInit() {
    // try to get the user/owner's teams
    this.http.get(apiUrl('githubOwnerTeams')).map((res: Response) => res.json())
      .subscribe((data) => {
        this.state = {...(this.state), teams: data.teams, ready: true, lastPage: data.lastPage};
      }, this.auth);
  }

  /**
   * auth Redirect user to authentication page when unauthorized error is given
   */
  auth = (e) => {
    const res = e.json();
    if(res && res.code === 'UNAUTHORIZED') {
      // external url, use location href to navigate
      window.location.href = apiUrl('githubOwnerLogin');
    }
  }

  /**
   * getSharableLink Get the register url for a team
   * @param {Object} team The team to get url for
   */
  getSharableLink(team) {
    // clear error message
    this.errorMsg = null;
    // update state with active team
    this.state = {...(this.state), team: team.id};

    // if url already available return it
    if(this.state.links[team.id]) {
      return;
    }

    // get the team url from api
    const url = apiUrl('githubOwnerTeamUrl').replace(':teamid:', team.id);
    this.http.get(url).map((res: Response) => res.json())
      .map((data) => data.url).subscribe(data => this.state.links[team.id] = data, (err) => {
        const e = err.json();
        this.errorMsg = e.message;
      });
  }

  /**
   * get all pages
   * @return {Array} all pages
   */
  getPages() {
    let lastPage = this.state.lastPage || 1;
    if (lastPage < 1) lastPage = 1;
    const pages = [];
    for (let i = 1; i <= lastPage; i++) pages.push(i);
    return pages;
  }

  /**
   * Change page.
   */
  changePage() {
    // clear error message
    this.errorMsg = null;
    this.http.get(`${apiUrl('githubOwnerTeams')}?page=${this.state.page}`).map((res: Response) => res.json())
      .subscribe((data) => {
        this.state = {...(this.state), teams: data.teams, ready: true};
      }, this.auth);
  }
}
