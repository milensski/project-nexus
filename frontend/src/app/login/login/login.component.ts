import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  token = ''

  constructor(private authService: AuthService, private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) {
      'hitted here'
      return
    }

    this.authService.login(form.value.username, form.value.password).pipe(catchError(this.authService.handleError)).subscribe((res) => {
      res=this.token
    })

    // console.log(this.errorMessage);
    
  }

  
  // this.router.navigate(['/home']);)
}

