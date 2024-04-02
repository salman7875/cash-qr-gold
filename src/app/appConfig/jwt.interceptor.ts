import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: any;
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.getToken()
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return next.handle(request);
  }

  async getToken() {
    this.token = await Preferences.get({ key: 'jwt' });
  }
}
