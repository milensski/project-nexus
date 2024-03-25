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
    const storedUser = localStorage.getItem(this.authService.CURRENT_USER);
    const token = localStorage.getItem(this.authService.JWT_TOKEN)
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null
      if (parsedUser && !this.authService.isTokenExpired(parsedUser.exp)) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(req);
      } else {
        // Token is expired, remove it
        localStorage.removeItem(this.authService.JWT_TOKEN);
        localStorage.removeItem(this.authService.CURRENT_USER)
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


