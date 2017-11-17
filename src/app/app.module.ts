import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{RouterModule} from '@angular/router';

import{AuthGuard} from './shared/user/auth.guard.service'

import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import {DataService} from './shared/data.service';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './shared/user/auth.service'


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    ContactusComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:"about",
        component:AboutusComponent,
        canActivate: [AuthGuard]
      },
      {
        path:"contactus",
        component:ContactusComponent,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ])
  ],
  providers: [DataService,AuthService,AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
