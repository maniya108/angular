import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { App } from '../constants/app.contants';
import { IUserInfo } from './../../models/auth.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userData = localStorage.getItem(App.loginUser);
    if (userData) {
      const userInfo = JSON.parse(userData) as IUserInfo;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
