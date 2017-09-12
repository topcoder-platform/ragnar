import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { apiUrl } from 'app/common/api-urls';

@Component({
  selector: 'app-owner-page',
  templateUrl: 'owner-page.component.html',
  styleUrls: ['owner-page.component.css']
})
export class OwnerPageComponent implements OnInit {
  public state: any = {teams: [], ready: false, links: {}};

  constructor(private http: Http) { }

  ngOnInit() {
    // try to get the user/owner's teams
    this.http.get(apiUrl('ownerTeams')).map((res: Response) => res.json())
      .subscribe((data) => {
        this.state = {...(this.state), teams: data.teams, ready: true};
      }, this.auth);
  }

  /**
   * auth Redirect user to authentication page when unauthorized error is given
   */
  auth = (e) => {
    const res = e.json();
    if(res && res.code === 'UNAUTHORIZED') {
      // external url, use location href to navigate
      window.location.href = apiUrl('ownerLogin');
    }
  }

  /**
   * getSharableLink Get the register url for a team
   * @param {Object} team The team to get url for
   */
  getSharableLink(team) {
    // update state with active team
    this.state = {...(this.state), team: team.id};

    // if url already available return it
    if(this.state.links[team.id]) {
      return;
    }

    // get the team url from api
    const url = apiUrl('ownerTeamUrl').replace(':teamid:', team.id);
    this.http.get(url).map((res: Response) => res.json())
      .map((data) => data.url).subscribe(data => this.state.links[team.id] = data);
  }
}
