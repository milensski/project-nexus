import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/types';
import { ProjectDetailsContent } from '../project-details/project-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../project.service';
import { ErrorHandlingService } from 'src/app/error-handling-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flat-card-project',
  templateUrl: './flat-card-project.component.html',
  styleUrls: ['./flat-card-project.component.scss']
})
export class FlatCardProjectComponent {

  @Input() project: Project = {} as Project;
  
  @Output() projectDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private errorService: ErrorHandlingService,
    private router: Router) { }

  openProjectDetails() {
    this.dialog.open(ProjectDetailsContent, {
      data: this.project,
      width: '800px',
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id).subscribe(
      response => {
        this.errorService.showAuthError('Project DELETED')
        this.projectDeleted.emit(this.project.id);
      }, error => {
        this.errorService.handleError(error)
      });
  }

}
