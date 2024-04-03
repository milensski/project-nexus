import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CardProjectComponent } from './card-project/card-project.component';
import { ProjectDetailsComponent, ProjectDetailsContent } from './project-details/project-details.component';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TechkStackAutocompleteComponent } from '../techk-stack-autocomplete/techk-stack-autocomplete.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { FlatCardProjectComponent } from './flat-card-project/flat-card-project.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { InitialsPipe } from './initials.pipe';
import { JoinPipe } from './join.pipe';



@NgModule({
  declarations: [CardProjectComponent, ProjectDetailsComponent, ProjectDetailsContent, CreateProjectComponent, ProjectManageComponent, FlatCardProjectComponent, InitialsPipe, JoinPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    NgFor,
    ReactiveFormsModule,
    AsyncPipe,
    TechkStackAutocompleteComponent,
    RouterModule
  ],
  exports: [CardProjectComponent],
  providers: []
})
export class ProjectModule { }

