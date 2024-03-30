import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechkStackAutocompleteComponent } from './techk-stack-autocomplete.component';

describe('TechkStackAutocompleteComponent', () => {
  let component: TechkStackAutocompleteComponent;
  let fixture: ComponentFixture<TechkStackAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TechkStackAutocompleteComponent]
    });
    fixture = TestBed.createComponent(TechkStackAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
