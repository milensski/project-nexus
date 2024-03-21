import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit {
  public currentUser;
  constructor() {
    this.currentUser = localStorage.getItem('currentUser')
    JSON.parse(localStorage.getItem('currentUser') || '');
  }

  ngOnInit() {

  }
}