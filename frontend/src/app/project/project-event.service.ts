import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectEventService {
  projectDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  emitProjectDeleted(projectId: string) {
    this.projectDeleted.emit(projectId);
  }
}