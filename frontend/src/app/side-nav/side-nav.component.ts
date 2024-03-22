import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;

  isCollapsed = false;
  isOpen = true

  isMenuHidden = true
  currentUser: any

  constructor(private observer: BreakpointObserver, private router: Router, private authService : AuthService) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  ngAfterContentChecked() {
    if (this.currentUser) {
      console.log('Current user:', this.currentUser); // Access user information here
    }
  }

    toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open();
      // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    
    }
  }


  isLandingPage() {
    return this.router.url === '/'
  }


}
