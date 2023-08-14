import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGenerationScreenComponent } from './component-generation-screen.component';

describe('ComponentGenerationScreenComponent', () => {
  let component: ComponentGenerationScreenComponent;
  let fixture: ComponentFixture<ComponentGenerationScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentGenerationScreenComponent]
    });
    fixture = TestBed.createComponent(ComponentGenerationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
