import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountUserProjectsCategoryComponent } from './count-user-projects-category.component';

describe('CountUserProjectsCategoryComponent', () => {
  let component: CountUserProjectsCategoryComponent;
  let fixture: ComponentFixture<CountUserProjectsCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountUserProjectsCategoryComponent]
    });
    fixture = TestBed.createComponent(CountUserProjectsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
