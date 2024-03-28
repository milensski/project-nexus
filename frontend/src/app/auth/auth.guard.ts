import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserToken } from '../types';
import { jwtDecode } from 'jwt-decode';
import { ErrorHandlingService } from '../error-handling-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private errorHandlingService: ErrorHandlingService) { }

  canActivate(): boolean {
    const token = localStorage.getItem(this.authService.JWT_TOKEN);
    const currentUser = this.authService.currentUserValue;

    if (token && currentUser) {
      try {
        const decodedToken = jwtDecode<UserToken>(token); // Use the correct type for decoded data
        if (!this.authService.isTokenExpired(decodedToken.exp)) {
          // Token exists and not expired, allow access
          return true;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        this.errorHandlingService.showAuthError('An error occurred while verifying your access. Please logging in again.');
        this.router.navigate(['/auth/login']);
      }
    }
    // Token doesn't exist or expired, redirect to login page
    this.errorHandlingService.showAuthError('Please login to proceed');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
