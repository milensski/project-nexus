import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandlingService } from 'src/app/error-handling-service';
import { CreateProject, Project, Techology, UserToken } from 'src/app/types';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {

  categories = [
    { id: "Full-stack", name: "Full-stack" },
    { id: "Backend", name: "Backend" },
    { id: "Frontend", name: "Frontend" }
  ];

  


 form = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(5)]],
  description: ['', [Validators.required]],
  category: [null, [Validators.required]],
  techStackNames: [[], [Validators.required]],
});


constructor(private fb: FormBuilder,  
  private router: Router, 
  private authService: AuthService,
  private porjectService: ProjectService,
  private errorService: ErrorHandlingService) { }

ngOnInit() {
  initFlowbite();
}

ngAfterViewInit() {
 
}

onTechStackSelected(selectedTechStacks: any): void {
  debugger
  this.form.get('techStackNames')?.setValue(selectedTechStacks); // Update techStackNames field
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
      
        debugger
        this.porjectService.createProject(project)
          .subscribe(response => {
            this.errorService.showSuccessMessage('Project created')
            this.router.navigate(['/home']); // Redirect to /home on success
          }, error => {
            this.errorService.handleError(error)
          });
      }
    }

}
