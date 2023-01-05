import { Component, OnInit } from '@angular/core';
import {LoginAuth} from '../models/auth';
import {AuthService} from '../services/auth.service';
import {NgForm} from '@angular/forms';
import {CustomToasterService} from '../../utils/custom-toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginAuth: LoginAuth = new LoginAuth();
  logging = false;

  constructor(private authService: AuthService,
              private toaster: CustomToasterService) { }

  ngOnInit(): void {
  }

  async login(form: NgForm) {
    this.logging = true;
    if (form.valid){
      try {
        await this.authService.logIn(this.loginAuth);
      } catch (e: any) {
        if (e.error.message){
          this.toaster.showToastMessage(e.error.message, 5000, 'danger')
        }
      }
    }
    this.logging = false;
  }


}
