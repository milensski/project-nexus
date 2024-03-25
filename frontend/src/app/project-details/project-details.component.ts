import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  
  project: Project = {} as Project

  isLoading = true

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    debugger
    this.projectService.getProject(projectId).subscribe(((project: Project) => {
      this.project = project
      this.isLoading = false
    }))
  }

}
