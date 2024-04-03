import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/types';

@Component({
  selector: 'app-total-count-project-card',
  templateUrl: './total-count-project-card.component.html',
  styleUrls: ['./total-count-project-card.component.scss']
})
export class TotalCountProjectCardComponent {
	projectsCount: {totalCount: number} = {totalCount: 0}

  constructor(private projectService: ProjectService, private authService: AuthService) { }


  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '') as UserToken; 

    if (!user) {
      return
    }

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
