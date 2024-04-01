import { Component } from '@angular/core';
import { Project, UserToken } from 'src/app/types';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent {

  isLoading = true

  projects: Project[] = []


  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '') as UserToken
    this.projectService.getUserProjects(user.id).subscribe((projects: Project[]) => {
      this.projects = projects;
      this.isLoading = false; // Set loading state to false after data is retrieved
    });
    
  }
}
