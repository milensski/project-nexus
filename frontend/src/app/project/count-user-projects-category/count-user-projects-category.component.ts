import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/types';

@Component({
  selector: 'app-count-user-projects-category',
  templateUrl: './count-user-projects-category.component.html',
  styleUrls: ['./count-user-projects-category.component.scss']
})
export class CountUserProjectsCategoryComponent {
  projectCountByCategory: { category: string, count: number }[] = [];

  projectsCount: {totalCount: number} = {totalCount: 0}

  categoryColors: { [category: string]: string } = {
    'Backend': 'backend',
    'Frontend': 'frontend',
    'Full-stack': 'full-stack'
  };

  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserProjectCountByCategory();
  }

  getUserProjectCountByCategory(): void {
    
    const user = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '') as UserToken; 

    if (!user) {
      return
    }

    this.projectService.getUserProjectCountByCategory(user.id)
      .subscribe(
        data => {
          this.projectCountByCategory = Object.entries(data).map(([category, count]) => ({ category, count }));
        },
        error => {
          console.error('Error fetching project count by category:', error);
        }
      );

      this.projectService.getUserProjectsCount(user.id)
      .subscribe(
        data => {
          this.projectsCount = data;
        },
        error => {
          console.error('Error fetching project count by category:', error);
        }
      );
    
  }
}
