import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { emailValidator } from 'src/app/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/utils/match-passwords-validator';
import { initFlowbite } from 'flowbite';
import { UserReg } from 'src/app/types';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  termsAccepted = false

  

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private errorService: ErrorHandlingService) { }

  ngOnInit() {
     initFlowbite();
  }

  get email() {
    return this.form.get('email')
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  register() {
    // Handle form submission logic here
    // You can access form values using this.registerForm.value
    if (this.form.invalid) {
      return;
    }

    if (this.form.valid && this.termsAccepted) {
      const user: UserReg = {
        username: this.form.value?.username,
        email: this.form.value?.email,
        password: this.form.value.passGroup?.password,
        rePassword: this.form.value.passGroup?.rePassword
      };

      this.authService.register(user)
        .subscribe(response => {
          debugger
          this.errorService.showSuccessMessage('Registered successfully')
          this.router.navigate(['/home']); // Redirect to /home on success
        }, error => {
          this.errorService.handleError(error)
        });
    }
  }

  onTermsAccepted(accepted: boolean) {
    this.termsAccepted = accepted
  }
}
