import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, UserToken } from '../types';
import { API } from '../constants';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProjects(): any {
    return this.http.get<Project[]>(`${API}/project`)
  }

  getProject(id: string | null): any {
    return this.http.get<Project>(`${API}/project/${id}`)
  }

  joinProject(project: Project) {
    const url = `${API}/${project.id}/join`;
    const user = localStorage.getItem(this.authService.CURRENT_USER)
    debugger
    this.http.post(url, {participant: user}).subscribe(
      (response) => {
        // Handle successful join response
        // this.project.participants.push(currentUser);  // Update local participants list
      },
      (error) => {
        // Handle error joining project
      }
    );
  }
}
