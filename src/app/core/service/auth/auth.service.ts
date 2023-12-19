import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import { isAuthenticated } from '@app/core/store/authStore/auth.selectors';
import AuthDetail from '@app/data/schema/AuthDetail';
import User from '@app/data/schema/User';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthDetail }>
  ) {}

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

  isAuthenticated() {
    let authenticated = false;

    this.store.select(isAuthenticated).subscribe((data) => {
      authenticated = data;
    });

    return authenticated;
  }

  getAuthenticatedUser() {
    let userDetails = new AuthDetail();

    this.store.select('auth').subscribe((data) => {
      userDetails = data;
    });

    return userDetails;
  }
}
