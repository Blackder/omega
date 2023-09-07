import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  getOptions,
  isRequired,
  setOptions,
  setPrototypeControl,
  setRequired,
  shouldIgnore,
} from '../decorators/decorators';
import { ComponentProperty } from '../component-property/component.property';
import { Selectable } from '../selectable';

export interface ComponentPropertyForm {
  formGroup: FormGroup;
  component: Selectable;
  name: string;
}

@Injectable()
export class ComponentPropertyService {
  private currentSelected: Selectable | null = null;
  private map: {
    [componentId: string]: ComponentPropertyForm;
  } = {};
  private selectedPropertySubject =
    new BehaviorSubject<ComponentPropertyForm | null>(null);
  public selectedProperty$ = this.selectedPropertySubject.asObservable();

  constructor(private fb: FormBuilder) {}

  registerComponentProperty<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >(
    componentId: string,
    componentProperty: ComponentProperty<TBuildingBlock>,
    component: Selectable,
    name: string
  ): FormGroup {
    if (this.map[componentId]) {
      return this.map[componentId].formGroup;
    }
    // Build the form based on the component property
    const formGroup = this.fb.group({});

    for (const key in componentProperty) {
      if (shouldIgnore(componentProperty, key)) {
        continue;
      }

      const property =
        componentProperty[key as keyof ComponentProperty<TBuildingBlock>];

      let control = this.getControl(key, property, componentProperty);
      formGroup.addControl(key, control);
    }

    this.map[componentId] = { formGroup, component, name };
    console.log(formGroup);
    return formGroup;
  }

  onComponentSelected<TBuildingBlock extends ComponentProperty<TBuildingBlock>>(
    componentId: string,
    component: Selectable
  ): void {
    if (this.currentSelected === component) {
      return;
    }

    if (this.currentSelected) {
      this.currentSelected.selected = false;
    }
    this.currentSelected = component;
    component.selected = true;
    this.selectedPropertySubject.next(this.map[componentId]);
  }

  getComponentPropertyFormGroup(componentId: string): FormGroup {
    return this.map[componentId].formGroup;
  }

  private getControl(key: string, property: any, parent: any): AbstractControl {
    let control: AbstractControl;

    if (Array.isArray(property)) {
      if (property.length === 0) {
        throw new Error(
          `You must initialize the array property '${key}' of ${parent.constructor.name} with one item for auto-form-generation by reflection`
        );
      }
      control = this.fb.array([]);

      const member = property[0];
      const formGroup = this.fb.group({});

      for (const memberKey in member) {
        const memberProperty = member[memberKey];
        const childControl = this.getControl(memberKey, memberProperty, member);
        formGroup.addControl(memberKey, childControl);
      }

      setPrototypeControl(control, formGroup);
      // (control as FormArray).push(formGroup);
    } else {
      control = this.fb.control(property);
      const options = getOptions(parent, key);
      if (options) {
        setOptions(control, options);
      }
    }

    this.addValidators(parent, key, control);

    return control;
  }

  private addValidators(
    parent: any,
    key: string,
    control: AbstractControl<any, any>
  ) {
    if (isRequired(parent, key)) {
      control.addValidators([Validators.required]);
      setRequired(control);
    }
  }
}
