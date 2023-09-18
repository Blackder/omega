import { Component, Input } from '@angular/core';
import { FormGroupComponent } from '../../component-property-form/form-group/form-group.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-angular-form-group-display',
  templateUrl: './angular-form-group-display.component.html',
  styleUrls: ['./angular-form-group-display.component.scss'],
})
export class AngularFormGroupDisplayComponent extends FormGroupComponent {
  @Input() override formGroup!: FormGroup;
}
