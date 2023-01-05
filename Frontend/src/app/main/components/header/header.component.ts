import { Component, OnInit } from '@angular/core';
import {User} from '../../../auth/models/auth';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.$user.subscribe(user => {
      this.user = user;
    })
  }

  logOut() {

  }
}
