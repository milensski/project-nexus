import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandlingService } from 'src/app/error-handling-service';
import { CreateProject, Project, Techology, UserToken } from 'src/app/types';
import { ProjectService } from '../project.service';
import { TechkStackAutocompleteComponent } from 'src/app/techk-stack-autocomplete/techk-stack-autocomplete.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent {

  projectId = ''

  categories = [
    { id: "Full-stack", name: "Full-stack" },
    { id: "Backend", name: "Backend" },
    { id: "Frontend", name: "Frontend" }
  ];


 form = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(5)]],
  description: ['', [Validators.required]],
  category: ['', [Validators.required]],
  techStackNames: [[] as (string | null | undefined)[] , [Validators.required]],
});


constructor(private fb: FormBuilder,  
  private router: Router, 
  private activatedRoute: ActivatedRoute, 
  private authService: AuthService,
  private porjectService: ProjectService,
  private errorService: ErrorHandlingService) { }

ngOnInit() {
  initFlowbite();
  this.activatedRoute.params.subscribe(params => {
    this.projectId = params['id']; 
    const project: Project = {} as Project
    
    if ( this.projectId) {
      this.porjectService.getProject( this.projectId).subscribe(
        (response) => {
          this.form.patchValue({
            title: response.title,
            description: response.description,
            category: response.category,
            techStackNames: response.techStack?.map(technology => technology.technologyName)
          })
        },
        (error) => {
          // Handle error
          this.errorService.handleError(error);
        }
      )
    }
    
  });
}

ngAfterViewInit() {
 
}

onTechStackSelected(selectedTechStacks: any): void {
  this.form.get('techStackNames')?.setValue(selectedTechStacks);
}


  
  onSubmit() {
    
      // Handle form submission logic here
      // You can access form values using this.registerForm.value
      if (this.form.invalid) {
        return;
      }
  
      if (this.form.valid) {
        const owner = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '') as UserToken
        const project: CreateProject = {
          title: this.form.value?.title,
          description: this.form.value?.description,
          category: this.form.value?.category,
          techStackNames: this.form.value.techStackNames as any,
          ownerId: owner.id,
          participantIds: []
        };
      
        this.porjectService.createProject(project)
          .subscribe(response => {
            this.errorService.showSuccessMessage('Project created')
            this.router.navigate(['/home']); // Redirect to /home on success
          }, error => {
            this.errorService.handleError(error)
          });
      }
    }


    onUpdate() {
    
      // Handle form submission logic here
      // You can access form values using this.registerForm.value
      if (this.form.invalid) {
        return;
      }
  
      if (this.form.valid) {
        const owner = JSON.parse(localStorage.getItem(this.authService.CURRENT_USER) || '') as UserToken
        const project: CreateProject = {
          title: this.form.value?.title,
          description: this.form.value?.description,
          category: this.form.value?.category,
          techStackNames: this.form.value.techStackNames as any,
          ownerId: owner.id,
          participantIds: []
        };
      
        this.porjectService.updateProject(project, this.projectId)
          .subscribe(response => {
            this.errorService.showSuccessMessage('Project updated')
            this.router.navigate(['project/manage']);
          }, error => {
            this.errorService.handleError(error)
          });
      }
    }

}
