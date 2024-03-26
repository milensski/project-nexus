import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardProjectComponent } from '../project/card-project/card-project.component';
import { ProjectModule } from '../project/project.module';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {

  // @Input() public project: Project = {} as Project // Use public for template access

  constructor(
    public dialog: MatDialog, // Inject project data
  ) { }



}

@Component({
  selector: 'app-project-details-content',
  templateUrl: './project-details-content.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsContent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private projectService: ProjectService) { }


  joinProject() {
    // Call project service to join the project
    this.projectService.joinProject(this.project)
  }
}