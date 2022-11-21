import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {RegComponent} from './reg/reg.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from "./auth.service";
import {HttpModule} from "@angular/http"
import {JwtModule} from '@auth0/angular-jwt'
import { QuillModule } from 'ngx-quill';
import { SortingPipe } from './sorting.pipe';
import { PostComponent } from './post/post.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    DashboardComponent,
    SortingPipe,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:() => {
          return localStorage.getItem('access_token');
        },
      },
    }),
    QuillModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
