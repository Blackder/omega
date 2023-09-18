import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {
  getLabel,
  getOptions,
  isHidden,
  isHiddenFromDisplayOnly,
} from '../../decorators/decorators';

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
}
