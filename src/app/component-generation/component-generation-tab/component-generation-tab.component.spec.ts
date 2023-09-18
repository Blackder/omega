import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGenerationTabComponent } from './component-generation-tab.component';

describe('ComponentGenerationTabComponent', () => {
  let component: ComponentGenerationTabComponent;
  let fixture: ComponentFixture<ComponentGenerationTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentGenerationTabComponent]
    });
    fixture = TestBed.createComponent(ComponentGenerationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
