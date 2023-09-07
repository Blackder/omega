import { Component, Input, OnInit } from '@angular/core';
import { ComponentPropertyService } from '../../component-generation-tab/component-property.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-component-property-display',
  templateUrl: './component-property-display.component.html',
  styleUrls: ['./component-property-display.component.scss'],
})
export class ComponentPropertyDisplayComponent implements OnInit {
  @Input() framework!: string;
  @Input() componentId!: string;
  formGroup!: FormGroup;

  constructor(private componentPropertyService: ComponentPropertyService) {}

  ngOnInit(): void {
    this.formGroup =
      this.componentPropertyService.getComponentPropertyFormGroup(
        this.componentId
      );
  }
}
