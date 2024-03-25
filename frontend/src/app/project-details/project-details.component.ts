import { Component, Inject, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  providers: [MatDialogRef]
})
export class ProjectDetailsComponent {

  public project: Project; // Use public for template access
  
  // project: Project = {} as Project

  // isLoading = true

  // constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  // ngOnInit(): void {
  //   const projectId = this.route.snapshot.paramMap.get('id');
  //   this.projectService.getProject(projectId).subscribe(((project: Project) => {
  //     this.project = project
  //     this.isLoading = false
  //   }))
  // }

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public projectData: Project // Inject project data
  ) {
    this.project = projectData; // Assign received data to project property
  }

  ngOnInit() {} // Consider using ngOnInit if you need lifecycle hooks

  closeDialog() {
    this.dialogRef.close();
  }

}
