import { Component } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  category: string = ""
  title: string = ""
  photo: string = ""
  text: string = ""

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  createPost() {
    let post: { date: Date; author: any; photo: string; text: string; category: string; title: string };
    post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem("user") || "{}").login,
      date: new Date()
    };
    if (!post.category) {
      this._flashMessagesService.show('Введите категорию!', {cssClass: 'alert-danger', timeout: 5000});
      return false
    } else if (!post.title) {
      this._flashMessagesService.show('Введите название заголовка!', {cssClass: 'alert-danger', timeout: 5000});
      return false
    } else if (!post.photo) {
      this._flashMessagesService.show('Добавьте фото!', {cssClass: 'alert-danger', timeout: 5000});
      return false
    } else if (!post.text) {
      this._flashMessagesService.show('Введите текст!', {cssClass: 'alert-danger', timeout: 5000});
      return false
    }
  console.log(post)
    this.authService.createPost(post).subscribe(data => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg,
          {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this._flashMessagesService.show(data.msg,
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/'])
      }
    })
    return false
  }
}
