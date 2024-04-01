import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManageComponent } from './project-manage.component';

describe('ProjectManageComponent', () => {
  let component: ProjectManageComponent;
  let fixture: ComponentFixture<ProjectManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManageComponent]
    });
    fixture = TestBed.createComponent(ProjectManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
