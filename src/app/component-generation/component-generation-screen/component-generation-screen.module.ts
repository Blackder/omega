import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationScreenComponent } from './component-generation-screen.component';
import { ComponentListModule } from '../component-list/component-list.module';
import { ComponentGenerationPanelModule } from '../component-generation-panel/component-generation-panel.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ComponentPropertyFactory } from '../component-property/component-property-factory.service';
import { ComponentGenerationTabModule } from '../component-generation-tab/component-generation-tab.module';

@NgModule({
  declarations: [ComponentGenerationScreenComponent],
  imports: [
    CommonModule,
    ComponentListModule,
    ComponentGenerationPanelModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    ComponentGenerationTabModule,
  ],
  providers: [ComponentPropertyFactory],
  exports: [ComponentGenerationScreenComponent],
})
export class ComponentGenerationScreenModule {}
