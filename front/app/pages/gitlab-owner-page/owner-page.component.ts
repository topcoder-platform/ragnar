import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { apiUrl } from 'app/common/api-urls';

@Component({
  selector: 'app-gitlab-owner-page',
  templateUrl: 'owner-page.component.html',
  styleUrls: ['owner-page.component.css']
})
export class GitlabOwnerPageComponent implements OnInit {
  public state: any = {groups: [], ready: false, links: {}, page: 1, lastPage: 1};

  constructor(private http: Http) { }

  ngOnInit() {
    // try to get the user/owner's groups
    this.http.get(apiUrl('gitlabOwnerGroups')).map((res: Response) => res.json())
      .subscribe((data) => {
        this.state = {...(this.state), groups: data.groups, ready: true, lastPage: data.lastPage};
      }, this.auth);
  }

  /**
   * auth Redirect user to authentication page when unauthorized error is given
   */
  auth = (e) => {
    const res = e.json();
    if(res && res.code === 'UNAUTHORIZED') {
      // external url, use location href to navigate
      window.location.href = apiUrl('gitlabOwnerLogin');
    }
  }

  /**
   * getSharableLink Get the register url for a group
   * @param {Object} group The group to get url for
   */
  getSharableLink(group) {
    // update state with active group
    this.state = {...(this.state), group: group.id};

    // if url already available return it
    if(this.state.links[group.id]) {
      return;
    }

    // get the group url from api
    const url = apiUrl('gitlabOwnerGroupUrl').replace(':groupid:', group.id);
    this.http.get(url).map((res: Response) => res.json())
      .map((data) => data.url).subscribe(data => this.state.links[group.id] = data);
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
    this.http.get(`${apiUrl('gitlabOwnerGroups')}?page=${this.state.page}`).map((res: Response) => res.json())
      .subscribe((data) => {
        this.state = {...(this.state), groups: data.groups, ready: true};
      }, this.auth);
  }
}
