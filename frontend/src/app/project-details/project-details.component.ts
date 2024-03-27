import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Project, User, UserToken } from '../types';
import { ProjectService } from '../project/project.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardProjectComponent } from '../project/card-project/card-project.component';
import { ProjectModule } from '../project/project.module';
import { ErrorHandlingService } from '../error-handling-service';
import { AuthService } from '../auth/auth.service';

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
export class ProjectDetailsContent implements OnInit {

  isParticipant = false
  isLogged = true
  user: UserToken | string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private projectService: ProjectService,
    private authService: AuthService ,
    private errorService: ErrorHandlingService) { }

    ngOnInit(): any {
      try {
        const storedUser = localStorage.getItem(this.authService.CURRENT_USER);
        if (storedUser) {
          this.user = JSON.parse(storedUser) as UserToken; // Type cast for safety
          this.isParticipant = this.checkIsParticipant(this.project, this.user)
          return this.isLogged = true
        }
      } catch (error) {
        return this.isLogged = false
      }
      return this.isLogged = false
    }

  checkIsParticipant(project: Project, user: UserToken) {

    return this.isParticipant = project.participants.some(participant => participant.id === user.id)
  }

  joinProject() {
    // Call project service to join the project
    this.projectService.joinProject(this.project).subscribe(
      (response: Project) => {
        this.errorService.showSuccessMessage('You have joined successfully')
        this.isParticipant = true
        return this.project = { ...this.project, participants: response.participants }
      },
      (error: any) => {
        this.errorService.showAuthError(error.message)
      }
    )
  }


  leaveProject() {
    this.projectService.leaveProject(this.project).subscribe(
      (response: Project) => {
        this.errorService.showSuccessMessage('You left the project successfully')
        this.isParticipant = false
        return this.project = { ...this.project, participants: response.participants }
      },
      (error: any) => {
        this.errorService.showAuthError(error.message)
      }
    )
  }
}
