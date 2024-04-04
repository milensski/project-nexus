import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { ProjectDetailsContent } from '../project/project-details/project-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlingService } from '../error-handling-service';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent implements OnInit {

  @Input() projectId: string | null = '';

  project: Project = {} as Project;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private errorHandlingService: ErrorHandlingService) {}


  ngOnInit(): void {
    
    
  }

  openProjectDetails() {

    if (this.projectId !== 'undefined') {
      this.projectService.getProject(this.projectId).subscribe(
        (response: Project) => {
          this.project = response;
        },
        (error: any) => {
          // Handle error
          return this.errorHandlingService.showAuthError('No last viewed project')
        }
      );
      this.dialog.open(ProjectDetailsContent, {
        data: this.project,
        width: '800px',
      });

      
      
    }
  }

}
