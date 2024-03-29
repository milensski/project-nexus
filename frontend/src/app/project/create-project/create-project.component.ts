import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ErrorHandlingService } from 'src/app/error-handling-service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {

  categories = [
    { id: 1, name: "Full-stack" },
    { id: 2, name: "Backend" },
    { id: 3, name: "Frontend" }
  ];

  ngOnInit() {
    initFlowbite();
 }

 form = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(5)]],
  description: ['', [Validators.required]],
  category: [null, [Validators.required]],
  techStackNames: ['', [Validators.required]],
});

constructor(private fb: FormBuilder,  private router: Router, private errorService: ErrorHandlingService) { }

}
