import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';



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
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
