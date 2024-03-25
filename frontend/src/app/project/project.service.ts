import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../types';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): any {
    return this.http.get<Project[]>(`${API}/project`)
  }
}
