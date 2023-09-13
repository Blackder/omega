import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArrayComponent } from '../../component-property-form/form-array/form-array.component';
import { BindingType } from '../../angular-component.property';
import { FormArray, FormBuilder } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-angular-form-array-display',
  templateUrl: './angular-form-array-display.component.html',
  styleUrls: ['./angular-form-array-display.component.scss'],
})
export class AngularFormArrayDisplayComponent
  extends FormArrayComponent
  implements OnInit, OnDestroy
{
  @Input() override name!: string;
  @Input() override formArray!: FormArray;
  BindingType = BindingType;

  override ngOnInit(): void {
    super.ngOnInit();
    this.formArray.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.updateControls();
        })
      )
      .subscribe();
  }
}
