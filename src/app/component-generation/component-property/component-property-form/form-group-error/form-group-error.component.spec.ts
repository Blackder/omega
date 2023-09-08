import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupErrorComponent } from './form-group-error.component';

describe('FormGroupErrorComponent', () => {
  let component: FormGroupErrorComponent;
  let fixture: ComponentFixture<FormGroupErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormGroupErrorComponent]
    });
    fixture = TestBed.createComponent(FormGroupErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
