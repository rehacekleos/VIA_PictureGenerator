import { Injectable } from '@angular/core';
import {LoginAuth, User, RegisterAuth} from '../models/auth';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private user: User;

  private token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.$user.subscribe(user => {
      this.user = user;
    })
    this.getTokenFromStorage();
  }

  async logIn(login: LoginAuth){
    const url = environment.authApi + "/login";
    const token = await firstValueFrom(this.http.post<{token: string}>(url, login));
    this.setToken(token.token, true);
  }

  async register(register: RegisterAuth){
    const url = environment.authApi + "/register";
    const token = await firstValueFrom(this.http.post<{token: string}>(url, register));
    this.setToken(token.token, true);
  }

  logOut(){
    this.$user.next(null);
    sessionStorage.clear();
    this.router.navigate(['']).then()
  }

  setToken(token: string, setUser: boolean){
    this.token = token;
    sessionStorage.setItem('jwtToken', token);
    if (setUser) {
      this.setUser(token);
    }
  }

  getTokenFromStorage(){
    const token = sessionStorage.getItem('jwtToken');
    if (token){
      this.token = token;
      this.setUser(token);
    }
  }

  private setUser(token: string){
    const user = JSON.parse(atob(token.split('.')[1]))
    this.$user.next(user);
  }

  getToken(){
    return this.token
  }

  getUser(){
    return this.user;
  }
}
