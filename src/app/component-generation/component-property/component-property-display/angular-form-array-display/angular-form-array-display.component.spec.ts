import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormArrayDisplayComponent } from './angular-form-array-display.component';

describe('AngularFormArrayDisplayComponent', () => {
  let component: AngularFormArrayDisplayComponent;
  let fixture: ComponentFixture<AngularFormArrayDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularFormArrayDisplayComponent]
    });
    fixture = TestBed.createComponent(AngularFormArrayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
