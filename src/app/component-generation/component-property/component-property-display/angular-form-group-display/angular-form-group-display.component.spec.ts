import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormGroupDisplayComponent } from './angular-form-group-display.component';

describe('AngularFormGroupDisplayComponent', () => {
  let component: AngularFormGroupDisplayComponent;
  let fixture: ComponentFixture<AngularFormGroupDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularFormGroupDisplayComponent]
    });
    fixture = TestBed.createComponent(AngularFormGroupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
