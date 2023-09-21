import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  getLabel,
  getOptions,
  getPrototypeControl,
  getValidations,
  hide,
  hideFromDisplayOnly,
  isHidden,
  isHiddenFromDisplayOnly,
  setLabel,
  setOptions,
  setPrototypeControl,
  setValidations,
} from '../../decorators/decorators';
import { FormService } from '../../component-generation-tab/form.service';

export class FormControlMetadata {
  readonly isFormArray: boolean;
  readonly asFormArray: FormArray;
  readonly isFormGroup: boolean;
  readonly asFormGroup: FormGroup;
  readonly options?: any[];
  readonly isCheckbox?: boolean;
  readonly label?: string;
  readonly hidden?: boolean;
  readonly hiddenFromDisplayOnly?: boolean;

  constructor(
    public readonly control: AbstractControl,
    public readonly name: string
  ) {
    this.isFormArray = control instanceof FormArray;
    this.asFormArray = control as FormArray;
    this.isFormGroup = control instanceof FormGroup;
    this.asFormGroup = control as FormGroup;
    this.options = getOptions(control);
    this.isCheckbox = typeof control.value === 'boolean';
    this.label = getLabel(control);
    this.hidden = isHidden(control);
    this.hiddenFromDisplayOnly = isHiddenFromDisplayOnly(control);
  }

  clone(formService: FormService): AbstractControl {
    if (this.isFormArray) {
      const formArray = formService.fb.array([]) as FormArray;
      const prototype = getPrototypeControl(this.control);
      if (prototype) {
        setPrototypeControl(formArray, prototype);
      }

      for (const childControl of this.asFormArray.controls) {
        const cloned = new FormControlMetadata(childControl, this.name).clone(
          formService
        );
        formArray.push(cloned);
      }

      return formArray;
    }

    if (this.isFormGroup) {
      const formGroup = formService.fb.group({});

      const validations = getValidations(this.control);
      if (validations) {
        setValidations(formGroup, validations);
      }

      for (const key in this.asFormGroup.controls) {
        const childControl = new FormControlMetadata(
          this.asFormGroup.controls[key],
          this.name
        ).clone(formService);

        formGroup.addControl(key, childControl);
      }

      return formGroup;
    }

    let control = formService.fb.control(this.control.value);

    if (this.options) {
      setOptions(control, this.options);
    }
    if (this.label) {
      setLabel(control, this.label);
    }
    if (this.hidden) {
      hide(control);
    }
    if (this.hiddenFromDisplayOnly) {
      hideFromDisplayOnly(control);
    }

    formService.addValidators(control, control);
    return control;
  }
}
