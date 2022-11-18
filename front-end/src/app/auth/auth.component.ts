import { Component } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  login: String = ''
  password: String = ''

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  signIn() {
    const user = {
      login: this.login,
      password: this.password
    }
    if (!user.login) {
      this._flashMessagesService.show('Введите ваш логин!', {cssClass: 'alert-danger', timeout: 5000});
      return false
    } else if (!user.password) {
      this._flashMessagesService.show('Введите пароль!', {cssClass: 'alert-danger', timeout: 5000});
      return false
    }

    this.authService.authUser(user).subscribe(data => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg,
          {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this._flashMessagesService.show("Вы успешно авторизовались!",
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
        this.authService.storeUser({token: data.token, user: data.user})
      }
    })
    return false
  }
}
