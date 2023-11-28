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
    return this.http.post<AuthDetail>(
      `${CONSTANTS.apiRoot}/auth/login`,
      {
        email,
        password,
      },
      { observe: 'response' }
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post<User>(
      `${CONSTANTS.apiRoot}/auth/register`,
      {
        name,
        email,
        password,
      },
      {
        observe: 'response',
      }
    );
  }
}
