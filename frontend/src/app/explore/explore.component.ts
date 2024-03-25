import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {

  isExpanded=false;
  isLoading = true

  projects: Project[] = []


  constructor(private projectService: ProjectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.isLoading = false; // Set loading state to false after data is retrieved
    });
  }

}
