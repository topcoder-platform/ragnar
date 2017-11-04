import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// auth services
import { AuthModule } from './common/auth/auth.module';

// app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// app pages
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TCLoginPageComponent } from './pages/tc-login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { GithubOwnerPageComponent } from './pages/github-owner-page/owner-page.component';
import { GithubOwnerLoginComponent } from './pages/github-owner-page/owner-login.component';
import { GithubMemberAddedPageComponent } from './pages/github-members/member-added-page.component';
import { GitlabOwnerPageComponent } from './pages/gitlab-owner-page/owner-page.component';
import { GitlabOwnerLoginComponent } from './pages/gitlab-owner-page/owner-login.component';
import { GitlabMemberAddedPageComponent } from './pages/gitlab-members/member-added-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TCLoginPageComponent,
    UsersPageComponent,
    GithubOwnerPageComponent,
    GithubOwnerLoginComponent,
    GithubMemberAddedPageComponent,
    GitlabOwnerPageComponent,
    GitlabOwnerLoginComponent,
    GitlabMemberAddedPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
