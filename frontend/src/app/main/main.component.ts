import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserToken } from '../types';
import { LastViewedProjectService } from '../project/last-viewed-project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit {
  currentUser = ''
  isLoading = true;
  allUsers = '';
  lastViewedProjectId: string | null = '';

  constructor(private authService: AuthService, private lastViewedProjectService: LastViewedProjectService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '').username || 'Anonymous'
  }

  ngOnInit() {
    this.lastViewedProjectId = this.lastViewedProjectService.getLastViewedProject();
    debugger
    
    this.authService.getUsers()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Re-throw for further handling by other mechanisms
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.isLoading = false
      this.allUsers = data
      
    })
  }
}