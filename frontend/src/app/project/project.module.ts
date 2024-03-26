import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CardProjectComponent } from './card-project/card-project.component';
import { ProjectDetailsComponent, ProjectDetailsContent } from './project-details/project-details.component';



@NgModule({
  declarations: [CardProjectComponent, ProjectDetailsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ProjectDetailsContent
  ],
  exports: [CardProjectComponent],
  providers: []
})
export class ProjectModule { }
