import { Component } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  logoutUser() {
    this.authService.logout()
    this._flashMessagesService.show("Вы вышли из учетной записи",
      {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/auth'])
  }
}
