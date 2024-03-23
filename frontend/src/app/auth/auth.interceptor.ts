import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserToken } from '../types';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const token = localStorage.getItem('token');
    try {
      const decodedToken: UserToken = jwtDecode(String(token))
      if (token && !this.authService.isTokenExpired(decodedToken.exp)) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(req);
      } else {
        // Token is expired, remove it
        localStorage.removeItem('token');
        // Redirect to login or do something else
        this.router.navigate(['/auth/login']);
        // Or throw an error if necessary
        return next.handle(req);
      }
    } catch (e) {
      console.warn(e);
      return next.handle(req)
    }
  }
}


