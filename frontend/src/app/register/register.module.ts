import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    RegisterComponent,
    PrivacyDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
