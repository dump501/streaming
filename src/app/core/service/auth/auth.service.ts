import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import AuthDetail from '@app/data/schema/AuthDetail';
import User from '@app/data/schema/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthDetail>(`${CONSTANTS.apiRoot}/auth/login`, {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post<User>(`${CONSTANTS.apiRoot}/auth/register`, {
      name,
      email,
      password,
    });
  }

  static isAuthenticated() {
    let authItems: string = localStorage.getItem('authDetails') ?? '{}';
    let authDetails: AuthDetail = JSON.parse(authItems);
    console.log(authDetails);
    let expirationTime = new Date(authDetails.expiresIn ?? 0);

    if (expirationTime > new Date()) {
      console.log('ok');

      return true;
    }
    return false;
  }

  static getUserDetails() {
    if (!AuthService.isAuthenticated()) {
      return null;
    }

    let details: AuthDetail = JSON.parse(
      localStorage.getItem('authDetails') ?? '{}'
    );
    return details;
  }

  setUserDetails(authDetails: AuthDetail) {
    localStorage.setItem('authDetails', JSON.stringify(authDetails));
  }
}
