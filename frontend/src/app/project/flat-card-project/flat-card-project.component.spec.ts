import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatCardProjectComponent } from './flat-card-project.component';

describe('FlatCardProjectComponent', () => {
  let component: FlatCardProjectComponent;
  let fixture: ComponentFixture<FlatCardProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatCardProjectComponent]
    });
    fixture = TestBed.createComponent(FlatCardProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
