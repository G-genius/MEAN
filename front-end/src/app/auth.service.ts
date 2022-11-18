import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: Http
  ) { }

  registerUser(user: { name: String; login: String; email: String; password: String; }) {
    let headers = new Headers()
      headers.append("Content-type", "application/json")
      return this.http.post("http://localhost:3000/account/reg", user,
        {headers: headers}).pipe(map(res => res.json()))
  }
}
