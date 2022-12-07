import { Component, OnInit } from '@angular/core';
import {LoginAuth} from '../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginAuth: LoginAuth = new LoginAuth();

  constructor() { }

  ngOnInit(): void {
  }

  login() {

  }


}
