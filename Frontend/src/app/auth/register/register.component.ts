import { Component, OnInit } from '@angular/core';
import {RegisterAuth} from '../models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerAuth: RegisterAuth = new RegisterAuth();
  rePassword = null;

  constructor() { }

  ngOnInit(): void {
  }

  register() {

  }
}
