import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './common/auth/auth-guard';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TCLoginPageComponent } from './pages/tc-login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { GithubOwnerPageComponent } from './pages/github-owner-page/owner-page.component';
import { GithubOwnerLoginComponent } from './pages/github-owner-page/owner-login.component';
import { GithubMemberAddedPageComponent } from './pages/github-members/member-added-page.component';
import { GitlabOwnerPageComponent } from './pages/gitlab-owner-page/owner-page.component';
import { GitlabOwnerLoginComponent } from './pages/gitlab-owner-page/owner-login.component';
import { GitlabMemberAddedPageComponent } from './pages/gitlab-members/member-added-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'tclogin', component: TCLoginPageComponent },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
  { path: 'github-owner-login', component: GithubOwnerLoginComponent },
  { path: 'github-owner', component: GithubOwnerPageComponent },
  { path: 'github-members/added', component: GithubMemberAddedPageComponent },
  { path: 'gitlab-owner-login', component: GitlabOwnerLoginComponent },
  { path: 'gitlab-owner', component: GitlabOwnerPageComponent },
  { path: 'gitlab-members/added', component: GitlabMemberAddedPageComponent },
  { path: '**', redirectTo: '/login' } // Page not found, redirect to login
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
