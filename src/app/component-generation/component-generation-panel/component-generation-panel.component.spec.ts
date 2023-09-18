import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGenerationPanelComponent } from './component-generation-panel.component';

describe('ComponentGenerationPanelComponent', () => {
  let component: ComponentGenerationPanelComponent;
  let fixture: ComponentFixture<ComponentGenerationPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentGenerationPanelComponent]
    });
    fixture = TestBed.createComponent(ComponentGenerationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
