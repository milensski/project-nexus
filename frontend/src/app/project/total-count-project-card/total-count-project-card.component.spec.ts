import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountProjectCardComponent } from './total-count-project-card.component';

describe('TotalCountProjectCardComponent', () => {
  let component: TotalCountProjectCardComponent;
  let fixture: ComponentFixture<TotalCountProjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCountProjectCardComponent]
    });
    fixture = TestBed.createComponent(TotalCountProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
