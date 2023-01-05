import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../auth/models/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  edit = false;

  backupUser: User;
  rePassword: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.$user.subscribe(user => {
      this.user = user;
    })
  }

  editProfile(){
    this.edit = true;
    this.backupUser = JSON.parse(JSON.stringify(this.user));
  }

  confirmEdit(){
    this.edit = false;
  }

  cancelEdit(){
    this.edit = false;
    this.user = this.backupUser;
  }

  setPicture() {

  }
}
