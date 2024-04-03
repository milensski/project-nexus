import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { ProjectDetailsContent } from '../project/project-details/project-details.component';
import { MatDialog } from '@angular/material/dialog';

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
    private projectService: ProjectService) {}


  ngOnInit(): void {
    
    
  }

  openProjectDetails() {

    debugger

    if (this.projectId !== 'undefined') {
      this.projectService.getProject(this.projectId).subscribe(
        (response: Project) => {
          this.project = response;
        },
        (error: any) => {
          // Handle error
          console.error('Error fetching project:', error);
        }
      );
      this.dialog.open(ProjectDetailsContent, {
        data: this.project,
        width: '800px',
      });
      
    }
  }

}
