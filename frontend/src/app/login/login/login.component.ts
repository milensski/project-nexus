import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandlingService } from 'src/app/error-handling-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  token = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  login(form: NgForm) {
    if (form.invalid) {
      return; 
    }

    this.authService.login(form.value.username, form.value.password)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle unauthorized error using errorHandlingService
            this.errorHandlingService.handleError(error);
            return throwError(error); // Re-throw for further handling if needed
          } else {
            console.error('An unexpected error occurred:', error);
            return throwError(error);
          }
        })
      )
      .subscribe((res) => {
        localStorage.setItem('token', res.token)
        this.errorHandlingService.showSuccessMessage('Login success')
        this.router.navigate(['/home'])
      });
  }
}


// this.router.navigate(['/home']);)


