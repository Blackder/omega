import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormControlMetadata } from '../form.util';
import { customValidationErrors } from './error.constant';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {
  @Input() name!: string;
  @Input() control!: AbstractControl;
  controlMetadata!: FormControlMetadata;
  customErrors = customValidationErrors;
  customErrorKeys = Object.keys(customValidationErrors);

  ngOnInit(): void {
    this.controlMetadata = new FormControlMetadata(this.control, this.name);
  }
}
