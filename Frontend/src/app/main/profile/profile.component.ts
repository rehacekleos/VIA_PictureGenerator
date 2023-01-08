import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {UpdateUser, User} from '../../auth/models/auth';
import {ImageService} from '../services/image.service';
import {UserService} from '../services/user.service';
import {J} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  updatedUser: UpdateUser;
  edit = false;

  backupUser: User;
  rePassword: string;

  imagesCount:  number;

  constructor(private authService: AuthService,
              private userService: UserService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.authService.$user.subscribe(user => {
      this.user = user;
    });

    this.imageService.getImagesCount().then(count => {
      this.imagesCount = count;
    })

  }

  editProfile(){
    this.updatedUser = {
      nickname: this.user.nickname,
      password: ''
    }
    this.edit = true;
    this.backupUser = JSON.parse(JSON.stringify(this.user));
  }

  async confirmEdit(){
    this.edit = false;
    const updated = await this.userService.updateUser(this.updatedUser);
    this.authService.$user.next(updated);
  }

  cancelEdit(){
    this.edit = false;
    this.user = JSON.parse(JSON.stringify(this.backupUser));
  }

}
