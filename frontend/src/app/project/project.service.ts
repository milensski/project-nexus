import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProject, Project, Techology, User, UserToken } from '../types';
import { API } from '../constants';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlingService } from '../error-handling-service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private authService: AuthService, errorService: ErrorHandlingService) { }

  createProject(project: CreateProject): Observable<Project> {
    return this.http.post<Project>(`${API}/project`, project)
  }

  updateProject(project: CreateProject, projectId: string): Observable<Project> {
    return this.http.put<Project>(`${API}/project/${projectId}`, project)
  }

  getProjects(): any {
    return this.http.get<Project[]>(`${API}/project`)
  }

  getProject(id: string | null): Observable<Project> {
    return this.http.get<Project>(`${API}/project/${id}`)
  }
  
  getUserProjects(userId: string): Observable<Project[]> {
    return this.http.post<Project[]>(`${API}/project/list`, {userId})
  }

  getTechnologies(): Observable<Techology[]> {
    return this.http.get<Techology[]>(`${API}/technology`)
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

  deleteProject(projectId: string): Observable<Project> {
    return this.http.delete<Project>(`${API}/project/${projectId}`)
  }

  getUserProjectCountByCategory(userId: string): Observable<{ [category: string]: number }> {
    return this.http.get<{ [category: string]: number }>(`${API}/project/manage/${userId}/countBy-category`)
  }

  getUserProjectsCount(userId: string): Observable<{totalCount: number}> {
    return this.http.get<{totalCount: number}>(`${API}/project/manage/${userId}/count`)
  }

  getAllUserProjectsParticipants(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${API}/project/manage/${userId}/participants`);
  }
  
}
