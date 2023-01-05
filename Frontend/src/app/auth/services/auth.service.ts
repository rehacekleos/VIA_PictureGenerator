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

  $user: BehaviorSubject<User> = new BehaviorSubject<User>({
    userId: '1',
    nickname: 'rehacleo',
    email: 'rehacleo@fel.cvut.cz',
    password: 'test',
    picture: ''
  });
  user: User;

  constructor(private http: HttpClient) {
    this.$user.subscribe(user => {
      this.user = user;
    })
  }

  async logIn(login: LoginAuth){
    const url = environment.authApi + "/login";
    const user = await firstValueFrom(this.http.post<User>(url, login));
    this.$user.next(user);
  }

  async register(register: RegisterAuth){
    const url = environment.authApi + "/register";
    const user = await firstValueFrom(this.http.post<User>(url, register));
    this.$user.next(user);
  }

  async changePassword(userId: string, newPassword: string){
    const url = environment.authApi + "/password";
  }

  logOut(){
    this.$user.next(null);
  }

}
