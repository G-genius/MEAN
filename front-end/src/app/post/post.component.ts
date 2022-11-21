import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  post$: Observable<any> | undefined
  login: string = ''

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem("user") || "{}").login
    }
    this.post$ = this.route.params
      .pipe(switchMap((params:Params) => {
        return this.authService.getPostById({id: params['id']})
      }))
  }
  deletePost(id: any) {
    this.authService.deletePost({id: id}).subscribe((data: { success: any; }) => {
      if (!data.success) {
        this._flashMessagesService.show("Пост не был удален!",
          {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this._flashMessagesService.show("Пост удален!",
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/'])
      }
    })
  }
}
