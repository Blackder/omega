import { Component, ViewEncapsulation } from '@angular/core';
import {
  ComponentPropertyForm,
  ComponentPropertyService,
} from '../component-generation-tab/component-property.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-component-property',
  templateUrl: './component-property.component.html',
  styleUrls: ['./component-property.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentPropertyComponent {
  selectedProperty$!: Observable<ComponentPropertyForm | null>;

  constructor(componentPropertyService: ComponentPropertyService) {
    this.selectedProperty$ = componentPropertyService.selectedProperty$;
  }
}
