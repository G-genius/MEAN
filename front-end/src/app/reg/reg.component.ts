import { Component } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent {

  name: String = ''
  login: String = ''
  email: String = ''
  password: String = ''

  constructor(private _flashMessagesService: FlashMessagesService) {

  }

  signUp() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    }
    if(!user.name) {
      this._flashMessagesService.show('Введите ваше имя!', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if(!user.email) {
      this._flashMessagesService.show('Введите ваш email!', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if(!user.login) {
      this._flashMessagesService.show('Введите ваш логин!', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if(!user.password) {
      this._flashMessagesService.show('Введите пароль!', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    return false
  }
}
