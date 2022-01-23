import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenintercaptorService implements HttpInterceptor {
  constructor(private _Injector: Injector) {}

  intercept(req, next) {
    let authService = this._Injector.get(AuthService);
    let tokenizadReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(tokenizadReq);
  }
  
}
