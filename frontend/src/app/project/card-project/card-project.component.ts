import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsContent } from '../../project-details/project-details.component';


@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss'],
  
})
export class CardProjectComponent {
  @Input() project: Project = {} as Project;
  
  
  constructor(private dialog: MatDialog) {}

  openProjectDetails() {
    this.dialog.open(ProjectDetailsContent, {
      data: this.project,
      width: '800px',
    });
  }

  
}
