import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './common/auth/auth-guard';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { OwnerPageComponent } from './pages/owner-page/owner-page.component';
import { OwnerLoginComponent } from './pages/owner-page/owner-login.component';
import { MemberAddedPageComponent } from './pages/members/member-added-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
  { path: 'owner-login', component: OwnerLoginComponent },
  { path: 'owner', component: OwnerPageComponent },
  { path: 'members/added', component: MemberAddedPageComponent },
  { path: '**', redirectTo: '/login' } // Page not found, redirect to login
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
