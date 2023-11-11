import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userDetails = AuthService.getUserDetails();
    if (AuthService.isAuthenticated() && userDetails) {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${userDetails.token}`
        ),
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
