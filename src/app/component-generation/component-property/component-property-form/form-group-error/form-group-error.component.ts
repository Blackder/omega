import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group-error',
  templateUrl: './form-group-error.component.html',
  styleUrls: ['./form-group-error.component.scss'],
})
export class FormGroupErrorComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() name!: string;

  controls: {
    name: string;
    control: AbstractControl;
  }[] = [];

  ngOnInit(): void {
    this.controls = Object.keys(this.formGroup.controls).map((k) => {
      return {
        name: k,
        control: this.formGroup.controls[k],
      };
    });
  }
}
