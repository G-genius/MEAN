import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any
  user: any

  constructor(
    private http: Http
  ) { }

  registerUser(user: { name: String; login: String; email: String; password: String; }) {
    let headers = new Headers()
      headers.append("Content-type", "application/json")
      return this.http.post("http://localhost:3000/account/reg", user,
        {headers: headers}).pipe(map(res => res.json()))
  }
  authUser(user: { login: String; password: String; }) {
    let headers = new Headers()
    headers.append("Content-type", "application/json")
    return this.http.post("http://localhost:3000/account/auth", user,
      {headers: headers}).pipe(map(res => res.json()))
  }
  storeUser({token, user}: { token: any, user: any }) {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    this.token = token
    this.user = user
  }

  logout() {
    this.token = null
    this.user = null
    localStorage.clear()
  }
}
