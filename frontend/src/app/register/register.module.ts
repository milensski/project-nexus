import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent,
    PrivacyDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
