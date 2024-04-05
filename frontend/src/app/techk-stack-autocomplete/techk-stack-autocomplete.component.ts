import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Techology } from '../types';
import { ProjectService } from '../project/project.service';


@Component({
  selector: 'app-techk-stack-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './techk-stack-autocomplete.component.html',
  styleUrls: ['./techk-stack-autocomplete.component.scss']
})
export class TechkStackAutocompleteComponent {


  separatorKeysCodes: number[] = [ENTER, COMMA];
  techCtrl = new FormControl('');
  filteredTechStacks: Observable<(string | null | undefined)[]>;
  techStacks: string[] = [];
  allTechStacks: (string | null | undefined)[] = [
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Python",
    "Java",
    "C#"
  ];

  @ViewChild('techInput') techInput: ElementRef<HTMLInputElement> = '' as any;

  @Output() techStackSelected = new EventEmitter<string[]>();

  @Input() projectId: string = '' // New input property to hold the projectId

  announcer = inject(LiveAnnouncer);

  projectService = inject(ProjectService)

  constructor() {
    this.filteredTechStacks = this.techCtrl.valueChanges.pipe(
      startWith(null),
      map((tech: string | null) => (tech ? this._filter(tech) : this.allTechStacks.slice())),
    );
  }

  ngOnInit() {

    if (this.projectId) {

       this.projectService.getProject(this.projectId).subscribe(
        response => {this.techStacks = response.techStack?.map(technology => technology.technologyName) as string[] }
       )
      
    }

    this.getAllTechStacks(); // Fetch tech stacks on component initialization
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.allTechStacks.includes(value)) {
      this.techStacks.push(value);
      this.allTechStacks.push(value); // Add to full list for filtering
    }

    // Clear the input value
    event.chipInput!.clear();
    this.techCtrl.setValue(null);
  }

  remove(tech: string): void {
    const index = this.techStacks.indexOf(tech);

    if (index >= 0) {
      this.techStacks.splice(index, 1);
      this.techStackSelected.emit(this.techStacks);
      this.announcer.announce(`Removed ${tech}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.techStacks.includes(event.option.value)) {

      this.techStacks.push(event.option.viewValue);

    }
    this.techInput.nativeElement.value = '';
    this.techCtrl.setValue(null);
    this.techStackSelected.emit(this.techStacks);
  }

  private getAllTechStacks() {
    this.projectService.getTechnologies()
      .subscribe(technologies => {
        // Handle successful response
        this.allTechStacks = [...this.allTechStacks,
           ...technologies
           .map(tech => tech.technologyName)
           .filter(name => name !== null && name !== undefined)]; // Combine mock and fetched data
        this.allTechStacks = this.removeDuplicates(this.allTechStacks.filter(value => value !== null && value !== undefined)); // Remove duplicates
      }, error => {
        console.error('Error fetching tech stacks:', error);
        // Consider providing user feedback (e.g., a toast notification)
      });
  }


  private removeDuplicates(arr: (string | null | undefined)[]): (string | null | undefined)[] {
    return Array.from(new Set(arr)); // Use Set for efficient duplicate removal
  }

  private _filter(value: string): (string | null | undefined)[] {
    const filterValue = value.toLowerCase();
    return this.allTechStacks.filter(tech => tech?.toLowerCase().includes(filterValue));
  }
}
