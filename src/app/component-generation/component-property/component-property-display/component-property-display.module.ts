import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertyDisplayComponent } from './component-property-display.component';
import { AngularFormGroupDisplayComponent } from './angular-form-group-display/angular-form-group-display.component';
import { AngularFormArrayDisplayComponent } from './angular-form-array-display/angular-form-array-display.component';

@NgModule({
  declarations: [
    ComponentPropertyDisplayComponent,
    AngularFormGroupDisplayComponent,
    AngularFormArrayDisplayComponent,
  ],
  imports: [CommonModule],
  exports: [ComponentPropertyDisplayComponent],
})
export class ComponentPropertyDisplayModule {}
