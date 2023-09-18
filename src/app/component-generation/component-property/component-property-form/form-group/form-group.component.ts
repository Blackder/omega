import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlMetadata } from '../form.util';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  controls: FormControlMetadata[] = [];

  ngOnInit(): void {
    this.updateControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateControls();
  }

  updateControls(): void {
    this.controls = Object.keys(this.formGroup.controls).map((k) => {
      const metadata = new FormControlMetadata(this.formGroup.controls[k], k);
      return metadata;
    });
  }
}
