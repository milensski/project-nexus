import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent {


  @Output() filter = new EventEmitter<string>();

  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Frontend', 'Backend', 'Full-stack']; // Add more categories as needed

  constructor() { }

  filterProjects(category: string) {
    this.filter.emit(category);
  }
}
