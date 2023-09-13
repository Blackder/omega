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
  getOptions,
  getPrototypeControl as getPrototypeControl,
  isRequired,
  setOptions,
} from 'src/app/component-generation/decorators/decorators';
import { Destroyable } from 'src/app/mixins/mixins';

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

  controls!: {
    control: AbstractControl;
    asFormGroup: FormGroup;
    isFormGroup: boolean;
  }[];
  private destroyed = new Subject<void>();
  destroyed$ = this.destroyed.asObservable();

  constructor(
    private fb: FormBuilder,
    private componentPropertyService: ComponentPropertyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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
        const childControl = this.fb.control(asFormGroup.controls[k].value);

        this.componentPropertyService.addValidators(
          asFormGroup.controls[k],
          childControl,
          this,
          formGroup
        );
        // if (isRequired(asFormGroup.controls[k])) {
        //   childControl.addValidators([Validators.required]);
        // }

        const options = getOptions(asFormGroup.controls[k]);
        setOptions(childControl, options);

        formGroup.addControl(k, childControl);
      });
      this.componentPropertyService.addValidators(asFormGroup, formGroup, this);
      control = formGroup;
    } else {
      control = this.fb.control('');

      this.componentPropertyService.addValidators(
        this.prototypeItem,
        control,
        this
      );
      // if (isRequired(prototype)) {
      //   control.addValidators([Validators.required]);
      // }
    }

    this.formArray.push(control);

    this.controls.push({
      control: control,
      isFormGroup: this.prototypeItemIsFormGroup,
      asFormGroup: control as FormGroup,
    });

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
