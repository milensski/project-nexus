import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root' // Provide as a root service for global access
})
export class ErrorHandlingService {

    constructor(private snackBar: MatSnackBar) { }

    handleError(error: HttpErrorResponse) {
        if (error.status === 401) {
            console.warn('Invalid credentials', error);
            this.showAuthError('Invalid credentials');
        } else {
            console.error('An unexpected error occurred:', error);
            this.showAuthError(error.message);
        }
    }

    showAuthError(message: string) {
        this.snackBar.open(message, 'OK',  {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-custom']
        });
    }

    showSuccessMessage(message: string) {
        this.snackBar.open(message, 'OK', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['sucess-custom']
        });
    }
}