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
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { OwnerPageComponent } from './pages/owner-page/owner-page.component';
import { OwnerLoginComponent } from './pages/owner-page/owner-login.component';
import { MemberAddedPageComponent } from './pages/members/member-added-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UsersPageComponent,
    OwnerPageComponent,
    OwnerLoginComponent,
    MemberAddedPageComponent,
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
