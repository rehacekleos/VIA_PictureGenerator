import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {UpdateUser, User} from '../../auth/models/auth';
import {environment} from '../../../environments/environment';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async updateUser(user: UpdateUser) {
    const url = environment.userApi;
    const updated = await firstValueFrom(this.http.put<User>(url, user));
    return updated
  }
}
