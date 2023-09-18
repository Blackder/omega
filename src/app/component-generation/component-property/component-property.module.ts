import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertyComponent } from './component-property.component';
import { ComponentPropertyFormModule } from './component-property-form/component-property-form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ComponentPropertyComponent],
  imports: [CommonModule, ReactiveFormsModule, ComponentPropertyFormModule],
  exports: [ComponentPropertyComponent],
})
export class ComponentPropertyModule {}
