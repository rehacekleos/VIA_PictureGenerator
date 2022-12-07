import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PasswordMatchDirective } from './utils/password-match.directive';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordMatchDirective
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
