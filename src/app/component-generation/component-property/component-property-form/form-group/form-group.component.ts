import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {
  getLabel,
  getOptions,
  isHidden,
} from 'src/app/component-generation/decorators/decorators';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  controls: {
    name: string;
    control: AbstractControl;
    isFormArray: boolean;
    asFormArray: FormArray;
    options?: any[];
    isCheckbox: boolean;
    label?: string;
    hidden?: boolean;
  }[] = [];

  ngOnInit(): void {
    this.updateControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateControls();
  }

  updateControls(): void {
    this.controls = Object.keys(this.formGroup.controls).map((k) => {
      const options = getOptions(this.formGroup.controls[k]);
      const label = getLabel(this.formGroup.controls[k]);
      const hidden = isHidden(this.formGroup.controls[k]);

      return {
        name: k,
        control: this.formGroup.controls[k],
        isFormArray: this.formGroup.controls[k] instanceof FormArray,
        asFormArray: this.formGroup.controls[k] as FormArray,
        options: options,
        isCheckbox: typeof this.formGroup.controls[k].value === 'boolean',
        label,
        hidden,
      };
    });
  }
}
