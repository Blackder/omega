import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  Validation,
  getLabel,
  getOptions,
  getValidations,
  hide,
  hideFromDisplayOnly,
  isHidden,
  isHiddenFromDisplayOnly,
  isRequired,
  setLabel,
  setOptions,
  setPrototypeControl,
  setRequired,
  setValidation,
  shouldIgnore,
} from '../decorators/decorators';
import { ComponentProperty } from '../component-property/component.property';

function validation(validation: Validation): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    if (!validation.condition(control.value)) {
      const individualFieldError =
        validation.forFields.length > 1 ? '' : validation.message;

      for (const field of validation.forFields) {
        const fieldControl = formGroup.controls[field];
        fieldControl.setErrors({ failedCondition: individualFieldError });
        fieldControl.markAsTouched();
      }
      return { failedCondition: validation.message };
    }

    for (const field of validation.forFields) {
      const fieldControl = formGroup.controls[field];
      fieldControl.setErrors(null);
      fieldControl.markAsTouched();
    }
    return null;
  };
}

@Injectable()
export class FormService {
  constructor(public fb: FormBuilder) {}

  getControl(key: any, propertyValue: any, parent: any): AbstractControl {
    let control!: AbstractControl;

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
        if (shouldIgnore(member, memberKey)) {
          continue;
        }
        const memberPropertyValue = member[memberKey];
        const childControl = this.getControl(
          memberKey,
          memberPropertyValue,
          member
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
    } else if (typeof propertyValue === 'object') {
      const formGroup = this.fb.group({});

      for (const key in propertyValue) {
        if (shouldIgnore(propertyValue, key)) {
          continue;
        }

        let childControl = this.getControl(
          key,
          propertyValue[key],
          propertyValue
        );
        formGroup.addControl(key, childControl);
      }

      control = formGroup;
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

      this.addValidators(parent, control, key);
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
      const validationConfigs = getValidations(target);

      if (validationConfigs) {
        setValidation(prototypeControl, validationConfigs);
      }
    }
  }

  addValidators(
    target: any,
    control: AbstractControl<any, any>,
    propertyKey?: string
  ) {
    if (isRequired(target, propertyKey)) {
      control.addValidators([Validators.required]);
    } else {
      const validationConfigs = getValidations(target);

      if (validationConfigs) {
        for (const validationConfig of validationConfigs) {
          control.addValidators(validation(validationConfig));
        }
      }
    }
  }
}
