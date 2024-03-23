import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit {
  currentUser = '';

  allUsers = '';

  constructor(private authService: AuthService) {
    this.currentUser = localStorage.getItem('currentUser') || 'Anonymous'
  }

  ngOnInit() {
    this.authService.getUsers()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Re-throw for further handling by other mechanisms
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.allUsers = data
      console.log(this.allUsers);
      
    })
  }
}