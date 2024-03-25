import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyDialogComponent } from './privacy-dialog.component';

describe('PrivacyDialogComponent', () => {
  let component: PrivacyDialogComponent;
  let fixture: ComponentFixture<PrivacyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyDialogComponent]
    });
    fixture = TestBed.createComponent(PrivacyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
