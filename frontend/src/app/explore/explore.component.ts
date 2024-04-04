import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEventService } from '../project/project-event.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {

  isExpanded=false;
  isLoading = true

  p: number = 1;
  projects: Project[] = []
  filteredProjects: Project[] = [];


  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private projectEventService: ProjectEventService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.filteredProjects = projects;
      this.isLoading = false; // Set loading state to false after data is retrieved
    });

    this.projectEventService.projectDeleted.subscribe(projectId => {
      this.projects = this.projects.filter(project => project.id !== projectId);
    });
  }

  applyFilter(category: string) {
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }

}
