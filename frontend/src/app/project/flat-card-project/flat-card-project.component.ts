import { Component, Input } from '@angular/core';
import { Project } from 'src/app/types';
import { ProjectDetailsContent } from '../project-details/project-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-flat-card-project',
  templateUrl: './flat-card-project.component.html',
  styleUrls: ['./flat-card-project.component.scss']
})
export class FlatCardProjectComponent {
  
  @Input() project: Project = {} as Project;

  constructor(private dialog: MatDialog) {}

  openProjectDetails() {
    this.dialog.open(ProjectDetailsContent, {
      data: this.project,
      width: '800px',
    });
  }
  
}
