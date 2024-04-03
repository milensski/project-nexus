import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Project, User, UserToken } from '../../types';
import { ProjectService } from '../project.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardProjectComponent } from '../card-project/card-project.component';
import { ProjectModule } from '../project.module';
import { ErrorHandlingService } from '../../error-handling-service';
import { AuthService } from '../../auth/auth.service';
import { ProjectEventService } from '../project-event.service';
import { LastViewedProjectService } from '../last-viewed-project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {


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

  public isOwner = false
  isParticipant = false
  isLogged = true
  user: UserToken | string = '';

  @Output() projectDeleted: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private projectService: ProjectService,
    private authService: AuthService ,
    private errorService: ErrorHandlingService,
    private projectEventService: ProjectEventService,
    private lastViewedProjectService: LastViewedProjectService) { }

    ngOnInit(): any {

      
      try {
        const storedUser = localStorage.getItem(this.authService.CURRENT_USER);
        this.lastViewedProjectService.storeLastViewedProject(this.project.id);
        if (storedUser) {
          this.user = JSON.parse(storedUser) as UserToken; // Type cast for safety
          this.isParticipant = this.checkIsParticipant(this.project, this.user)
          this.isOwner = this.checkIsOwner(this.project, this.user)
          return this.isLogged = true
        }
      } catch (error) {
        return this.isLogged = false
      }
      return this.isLogged = false
      
    }


  checkIsOwner(project: Project, user:UserToken) {
    return project.owner.username === user.username
  }

  checkIsParticipant(project: Project, user: UserToken) {

    return project.participants.some(participant => participant.id === user.id)
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

  deleteProject() {
    this.projectService.deleteProject(this.project.id).subscribe(
      response => {
        this.errorService.showSuccessMessage('Project deleted')
        this.projectEventService.emitProjectDeleted(this.project.id);
      }, error => {
        this.errorService.handleError(error)
      });
  }
}
