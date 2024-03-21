import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  exports: [LoginComponent]
  
})
export class LoginModule { }
