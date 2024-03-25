import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


})
export class AppComponent implements OnInit{

  isLoading = true

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoading = false
  }

  isLoginPage() {
    return this.router.url === '/auth/login'
  }

  isRegisterPage() {
    return this.router.url === '/auth/register/'
  }

}
