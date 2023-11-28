import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isAuthenticated } from '@app/core/store/authStore/auth.selectors';
import { Store } from '@ngrx/store';
import AuthDetail from '@app/data/schema/AuthDetail';
import { setUserDetails } from '@app/core/store/authStore/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ auth: AuthDetail }>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let userDetails: AuthDetail = new AuthDetail();
    this.store.select('auth').subscribe((data) => {
      userDetails = data;
    });
    let authenticated = false;
    this.store.select(isAuthenticated).subscribe((data) => {
      authenticated = data;
    });
    if (authenticated) {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${userDetails.token}`
        ),
      });

      return next.handle(clonedRequest);
    }
    this.store.dispatch(setUserDetails(new AuthDetail()));

    return next.handle(request);
  }
}
