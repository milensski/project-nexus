import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CardProjectComponent } from './card-project/card-project.component';
import { ProjectDetailsComponent, ProjectDetailsContent } from './project-details/project-details.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [CardProjectComponent, ProjectDetailsComponent, ProjectDetailsContent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [CardProjectComponent],
  providers: []
})
export class ProjectModule { }
