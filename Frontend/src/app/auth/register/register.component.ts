import { Component, OnInit } from '@angular/core';
import {RegisterAuth} from '../models/auth';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomToasterService} from '../../utils/custom-toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerAuth: RegisterAuth = new RegisterAuth();
  rePassword: string = null;
  error: string;

  registering = false;

  constructor(private authService: AuthService,
              private toaster: CustomToasterService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async register(form: NgForm) {
    this.registering = true;
    if (form.valid && this.rePassword === this.registerAuth.password){
      try {
        await this.authService.register(this.registerAuth);
        await this.router.navigate(['']);
      } catch (e: any) {
        if (e.error.message){
          this.toaster.showToastMessage(e.error.message, 5000, 'danger')
        }
      }
    }
    this.registering = false;
  }
}
