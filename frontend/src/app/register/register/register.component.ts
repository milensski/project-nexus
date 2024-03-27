import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { emailValidator } from 'src/app/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  
  termsAccepted = false

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', ],
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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    debugger
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  register() {
    debugger
    // Handle form submission logic here
    // You can access form values using this.registerForm.value
    if (this.form.invalid) {
      return;
    }

    if (this.form.valid && this.termsAccepted) {
      const user = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.passGroup?.password
      };

      console.log(user);
      

      // this.authService.register(user)
      //   .subscribe(response => {
      //     // Handle successful registration (e.g., navigate to login)
      //   }, error => {
      //     // Handle registration errors
      //   });
    }
  }

  onTermsAccepted(accepted: boolean) {
    this.termsAccepted = accepted
  }
}
