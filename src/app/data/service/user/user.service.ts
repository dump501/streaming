import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import User from '@app/data/schema/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<User>(`${CONSTANTS.apiRoot}/user/profile`);
  }
}
