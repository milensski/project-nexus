import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserToken } from '../types';
import { jwtDecode } from 'jwt-decode';
import { PUBLIC_ENDPOINTS } from '../constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storedUser = localStorage.getItem(this.authService.CURRENT_USER);
    const token = localStorage.getItem(this.authService.JWT_TOKEN)

    const isPublicRouter = PUBLIC_ENDPOINTS.some(endpoint => req.url.startsWith(endpoint))
    if ((!isPublicRouter || req.method !== 'GET') || req.url.endsWith('/leave') || req.url.endsWith('/join')) {
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (!this.authService.isTokenExpired(parsedUser.exp)) {
            // Add Authorization header with token only for API requests
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          } else {
            // Handle expired token:
            // 1. Remove tokens from storage
            localStorage.removeItem(this.authService.JWT_TOKEN);
            localStorage.removeItem(this.authService.CURRENT_USER);
            // 2. Redirect to login or handle appropriately
            this.router.navigate(['/auth/login']);
            return throwError('Token expired'); // Or an appropriate error object
          }
        } catch (error) {
          console.warn('Error parsing user or expired token:', error);
          return throwError(error);
        }
      }
    }

    // Handle non-API requests or requests without tokens here
    return next.handle(req);
  }
}


