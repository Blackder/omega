import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import {
  getValidation,
  getConditionalRequiredFunction,
  getOptions,
  isRequired,
  setAsConditionalRequired,
  setOptions,
  setPrototypeControl,
  setRequired,
  shouldIgnore,
  Validation,
  setValidation,
  getLabel,
  setLabel,
  hide,
  isHidden,
  isHiddenFromDisplayOnly,
  hideFromDisplayOnly,
} from '../decorators/decorators';
import { ComponentProperty } from '../component-property/component.property';
import { Block, ContainerBlock } from '../block';
import { Destroyable } from 'src/app/mixins/mixins';

export interface ComponentPropertyForm {
  formGroup: FormGroup;
  component: Block;
  name: string;
}

function conditionalRequired(
  parentForm: FormGroup,
  condition: (parentFormValue: any) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return condition(parentForm.value) && !control.value
      ? { required: true }
      : null;
  };
}

function validation(validation: Validation): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !validation.condition(control.value)
      ? { failedCondition: validation.message }
      : null;
  };
}

@Injectable()
export class ComponentPropertyService {
  private currentSelected: Block | null = null;
  private firstSelected: Block | null = null;
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
    component: Block & Destroyable,
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

      const propertyValue =
        componentProperty[key as keyof ComponentProperty<TBuildingBlock>];

      let control = this.getControl(
        key,
        propertyValue,
        componentProperty,
        component
      );
      formGroup.addControl(key, control);
    }

    this.map[componentId] = { formGroup, component, name };
    console.log(formGroup);
    return formGroup;
  }

  onComponentSelected(component: Block): void {
    if (this.currentSelected === component) {
      return;
    }

    if (!this.firstSelected) {
      this.firstSelected = component;
    }

    if (this.currentSelected) {
      this.currentSelected.selected = false;
    }
    this.currentSelected = component;
    component.selected = true;
    this.selectedPropertySubject.next(this.map[component.id]);
  }

  onComponentRemoved(component: Block): void {
    const currentSelectedComponentRemoved = this.removeComponent(component);
    if (currentSelectedComponentRemoved) {
      this.onComponentSelected(this.firstSelected as Block);
    }
  }

  private removeComponent<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >(component: Block): boolean {
    let currentSelectedComponentRemoved = component === this.currentSelected;

    delete this.map[component.id];
    const asContainer = component as ContainerBlock<TBuildingBlock>;

    if (asContainer?.container?.children.length > 0) {
      asContainer.container.children.forEach((c) => {
        currentSelectedComponentRemoved =
          currentSelectedComponentRemoved || this.removeComponent(c);
      });
    }

    return currentSelectedComponentRemoved;
  }

  getComponentPropertyFormGroup(componentId: string): FormGroup {
    return this.map[componentId].formGroup;
  }

  private getControl(
    key: string,
    propertyValue: any,
    parent: any,
    component: Destroyable
  ): AbstractControl {
    let control: AbstractControl;

    let parentFormGroup = undefined;
    if (Array.isArray(propertyValue)) {
      if (propertyValue.length === 0) {
        throw new Error(
          `You must initialize the array property '${key}' of ${parent.constructor.name} with one item for auto-form-generation by reflection`
        );
      }
      control = this.fb.array([]);

      const member = propertyValue[0];

      parentFormGroup = this.fb.group({});

      for (const memberKey in member) {
        const memberPropertyValue = member[memberKey];
        const childControl = this.getControl(
          memberKey,
          memberPropertyValue,
          member,
          component
        );
        parentFormGroup.addControl(memberKey, childControl);
        this.setValidationDecoratorForPrototypeControl(
          childControl,
          member,
          memberKey
        );
      }

      this.setValidationDecoratorForPrototypeControl(
        parentFormGroup,
        member.constructor
      );
      setPrototypeControl(control, parentFormGroup);
      // (control as FormArray).push(formGroup);
    } else {
      control = this.fb.control(propertyValue);
      const options = getOptions(parent, key);
      if (options) {
        setOptions(control, options);
      }

      if (isHidden(parent, key)) {
        hide(control);
      }

      if (isHiddenFromDisplayOnly(parent, key)) {
        hideFromDisplayOnly(control);
      }

      const label = getLabel(parent, key);
      if (label) {
        setLabel(control, label);
      }

      this.addValidators(parent, control, component, parentFormGroup, key);
    }

    return control;
  }

  private setValidationDecoratorForPrototypeControl(
    prototypeControl: AbstractControl,
    target: any,
    key?: string
  ): void {
    if (isRequired(target, key)) {
      setRequired(prototypeControl);
    } else {
      const conditionalRequiredFn = getConditionalRequiredFunction(target, key);

      if (conditionalRequiredFn) {
        setAsConditionalRequired(prototypeControl, conditionalRequiredFn);
      }

      const validationConfig = getValidation(target);

      if (validationConfig) {
        setValidation(prototypeControl, validationConfig);
      }
    }
  }

  addValidators(
    target: any,
    control: AbstractControl<any, any>,
    component: Destroyable,
    parentFormGroup?: FormGroup,
    propertyKey?: string
  ) {
    if (isRequired(target, propertyKey)) {
      control.addValidators([Validators.required]);
    } else if (parentFormGroup) {
      const conditionalRequiredFn = getConditionalRequiredFunction(
        target,
        propertyKey
      );

      if (conditionalRequiredFn) {
        control.addValidators(
          conditionalRequired(parentFormGroup, conditionalRequiredFn)
        );
        parentFormGroup.valueChanges
          .pipe(
            takeUntil(component.destroyed$),
            tap(() => {
              control.updateValueAndValidity({ emitEvent: false });
            })
          )
          .subscribe();
      }
    } else {
      const validationConfig = getValidation(target);

      if (validationConfig) {
        control.addValidators(validation(validationConfig));
      }
    }
  }
}
