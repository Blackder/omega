import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { ComponentPropertyService } from 'src/app/component-generation/component-generation-tab/component-property.service';
import {
  getLabel,
  getOptions,
  getPrototypeControl as getPrototypeControl,
  isRequired,
  setLabel,
  setOptions,
} from 'src/app/component-generation/decorators/decorators';
import { Destroyable } from 'src/app/mixins/mixins';
import { FormControlMetadata } from '../form.util';
import { FormService } from 'src/app/component-generation/component-generation-tab/form.service';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit, OnDestroy, Destroyable {
  @Input() name!: string;
  @Input() formArray!: FormArray;
  @Input() parentFormGroup!: FormGroup;
  prototypeItem!: FormGroup;
  prototypeItemIsFormGroup!: boolean;

  controls!: FormControlMetadata[];
  private destroyed = new Subject<void>();
  destroyed$ = this.destroyed.asObservable();

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.prototypeItem = getPrototypeControl(this.formArray);
    this.prototypeItemIsFormGroup = this.prototypeItem instanceof FormGroup;
    this.updateControls();
  }

  protected updateControls(): void {
    this.controls = this.formArray.controls.map(
      (c) => new FormControlMetadata(c, '')
    );
  }

  add(): void {
    // const prototype = this.controls[0];
    const prototype = this.prototypeItem;
    let control: AbstractControl;

    if (this.prototypeItemIsFormGroup) {
      const asFormGroup = prototype as FormGroup;
      const formGroup = this.fb.group({});
      Object.keys(asFormGroup.controls).forEach((k) => {
        const childControl = this.fb.control(asFormGroup.controls[k].value);

        this.formService.addValidators(
          asFormGroup.controls[k],
          childControl,
        );

        const options = getOptions(asFormGroup.controls[k]);
        setOptions(childControl, options);

        const label = getLabel(asFormGroup.controls[k]);
        setLabel(childControl, label);

        formGroup.addControl(k, childControl);
      });
      this.formService.addValidators(asFormGroup, formGroup);
      control = formGroup;
    } else {
      control = this.fb.control('');

      this.formService.addValidators(
        this.prototypeItem,
        control,
      );
    }

    this.formArray.push(control);

    this.controls.push(new FormControlMetadata(control, ''));

    this.changeDetectorRef.detectChanges();
  }

  remove(index: number): void {
    this.formArray.removeAt(index);
    this.controls.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
