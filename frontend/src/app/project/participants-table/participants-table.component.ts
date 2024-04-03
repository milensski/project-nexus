import { Component } from '@angular/core';
import { User, UserToken } from 'src/app/types';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.scss']
})
export class ParticipantsTableComponent {
  participants: User[] = [];

  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchParticipants();
  }

  fetchParticipants(): void {

    const user = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '') as UserToken; 

    if (!user) {
      return
    }
    this.projectService.getAllUserProjectsParticipants(user.id)
      .subscribe(
        participants => {
          this.participants = participants;
        },
        error => {
          console.error('Error fetching participants:', error);
        }
      );
  }
}
