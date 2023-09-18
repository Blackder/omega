import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertyDisplayComponent } from './component-property-display.component';
import { AngularFormGroupDisplayComponent } from './angular-form-group-display/angular-form-group-display.component';
import { AngularFormArrayDisplayComponent } from './angular-form-array-display/angular-form-array-display.component';
import { ComponentPropertyFormModule } from '../component-property-form/component-property-form.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes/app-pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ComponentPropertyDisplayComponent,
    AngularFormGroupDisplayComponent,
    AngularFormArrayDisplayComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ComponentPropertyFormModule,
    AppPipesModule,
  ],
  exports: [ComponentPropertyDisplayComponent],
})
export class ComponentPropertyDisplayModule {}
