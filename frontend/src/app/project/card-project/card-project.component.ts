import { Component, Input } from '@angular/core';
import { Project } from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsComponent } from 'src/app/project-details/project-details.component';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss'],
  
})
export class CardProjectComponent {
  @Input() project: Project = {} as Project;

  isExpanded: boolean = false;
  
  constructor(private dialog: MatDialog) {}

  openProjectDetails(project: Project) {
    debugger
    this.dialog.open(ProjectDetailsComponent, {
      data: project
    });
  }
}
