import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, User, UserToken } from '../types';
import { API } from '../constants';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlingService } from '../error-handling-service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private authService: AuthService, errorService: ErrorHandlingService) { }

  getProjects(): any {
    return this.http.get<Project[]>(`${API}/project`)
  }

  getProject(id: string | null): any {
    return this.http.get<Project>(`${API}/project/${id}`)
  }

  joinProject(project: Project): any {
    const url = `${API}/project/${project.id}/join`;
    const user: UserToken = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '')
    const isAlreadyParticipant = project.participants.some(participant=>participant.username === user.username)
    if (isAlreadyParticipant) {
      return throwError(() => new Error('You have already joined'));
    }
    return this.http.post<User>(url, {user})
  }

  leaveProject(project: Project): any {
    const url = `${API}/project/${project.id}/leave`;
    const user: UserToken = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '')
    const isAlreadyParticipant = project.participants.some(participant=>participant.username === user.username)
    if (!isAlreadyParticipant) {
      return throwError(() => new Error('You are not participating'));
    }
    return this.http.post<User>(url, {user})
  }
  
}
