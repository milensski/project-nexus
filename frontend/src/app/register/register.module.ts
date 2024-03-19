import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';



@NgModule({
  declarations: [
    RegisterComponent,
    PrivacyDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    
  ]
})
export class RegisterModule { }
