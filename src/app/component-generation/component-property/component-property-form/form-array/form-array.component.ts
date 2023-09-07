import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  getPrototypeControl as getPrototypeControl,
  isRequired,
} from 'src/app/component-generation/decorators/decorators';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit {
  @Input() name!: string;
  @Input() formArray!: FormArray;
  @Input() parentFormGroup!: FormGroup;
  prototypeItem!: FormGroup;
  prototypeItemIsFormGroup!: boolean;

  controls!: {
    control: AbstractControl;
    asFormGroup: FormGroup;
    isFormGroup: boolean;
  }[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prototypeItem = getPrototypeControl(this.formArray);
    this.prototypeItemIsFormGroup = this.prototypeItem instanceof FormGroup;
    this.updateControls();
  }

  protected updateControls(): void {
    this.controls = this.formArray.controls.map((c) => ({
      control: c,
      isFormGroup: this.prototypeItemIsFormGroup,
      asFormGroup: c as FormGroup,
    }));
  }

  add(): void {
    // const prototype = this.controls[0];
    const prototype = this.prototypeItem;
    let control: AbstractControl;

    if (this.prototypeItemIsFormGroup) {
      const asFormGroup = prototype as FormGroup;
      const formGroup = this.fb.group({});
      Object.keys(asFormGroup.controls).forEach((k) => {
        const childControl = this.fb.control('');

        if (isRequired(asFormGroup.controls[k])) {
          childControl.addValidators([Validators.required]);
        }

        formGroup.addControl(k, childControl);
      });
      control = formGroup;
    } else {
      control = this.fb.control('');

      if (isRequired(prototype)) {
        control.addValidators([Validators.required]);
      }
    }

    this.formArray.push(control);

    this.controls.push({
      control: control,
      isFormGroup: this.prototypeItemIsFormGroup,
      asFormGroup: control as FormGroup,
    });
  }

  remove(index: number): void {
    this.formArray.removeAt(index);
    this.controls.splice(index, 1);
  }
}
