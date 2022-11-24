import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {map} from "rxjs/operators";
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any
  user: any

  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService
  ) { }

  registerUser(user: { name: String; login: String; email: String; password: String; }) {
    let headers = new Headers()
      headers.append("Content-type", "application/json")
      return this.http.post("http://127.0.0.1:1337/account/reg", user,
        {headers: headers}).pipe(map(res => res.json()))
  }
  authUser(user: { login: String; password: String; }) {
    let headers = new Headers()
    headers.append("Content-type", "application/json")
    return this.http.post("http://127.0.0.1:1337/account/auth", user,
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

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  createPost(post: { category: string; title: string; photo: string; text: string; author: any; date: Date; }) {
    let headers = new Headers()
    headers.append("Authorization", localStorage.getItem('token') || "{}")
    headers.append("Content-type", "application/json")
    return this.http.post("http://127.0.0.1:1337/account/dashboard", post,
      {headers: headers}).pipe(map(res => res.json()))
  }

  getAllPosts() {
    return this.http.get("http://127.0.0.1:1337").pipe(map(res => res.json()))
  }

  getPostById({id}: { id: any }) {
    return this.http.get(`http://127.0.0.1:1337/post/${id}`).pipe(map(res => res.json()))
  }

  deletePost({id}: { id: any }) {
    let headers = new Headers()
    headers.append("Authorization", localStorage.getItem('token') || "{}")
    return this.http.delete(`http://127.0.0.1:1337/post/${id}`, {headers: headers}).pipe(map(res => res.json()))
  }
}
