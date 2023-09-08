import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormErrorComponent } from './form-error/form-error.component';
import { AppPipesModule } from 'src/app/pipes/app-pipes/app-pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormGroupErrorComponent } from './form-group-error/form-group-error.component';

@NgModule({
  declarations: [
    FormGroupComponent,
    FormArrayComponent,
    FormErrorComponent,
    FormGroupErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    AppPipesModule,
    MatButtonModule,
  ],
  exports: [
    FormGroupComponent,
    FormArrayComponent,
    FormErrorComponent,
    FormGroupErrorComponent,
  ],
})
export class ComponentPropertyFormModule {}
