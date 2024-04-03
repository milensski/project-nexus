import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastViewedProjectService {

  private readonly STORAGE_KEY = 'lastViewedProject';

  constructor() { }

  storeLastViewedProject(projectId: string): void {
    localStorage.setItem(this.STORAGE_KEY, projectId);
  }

  getLastViewedProject(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }
}
