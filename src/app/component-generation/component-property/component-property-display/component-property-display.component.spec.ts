import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertyDisplayComponent } from './component-property-display.component';

describe('ComponentPropertyDisplayComponent', () => {
  let component: ComponentPropertyDisplayComponent;
  let fixture: ComponentFixture<ComponentPropertyDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPropertyDisplayComponent]
    });
    fixture = TestBed.createComponent(ComponentPropertyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
