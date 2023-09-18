import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationTabComponent } from './component-generation-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentListModule } from '../component-list/component-list.module';
import { ComponentGenerationPanelModule } from '../component-generation-panel/component-generation-panel.module';
import { ComponentPropertyService } from './component-property.service';
import { ComponentPropertyModule } from '../component-property/component-property.module';

@NgModule({
  declarations: [ComponentGenerationTabComponent],
  imports: [
    CommonModule,
    ComponentListModule,
    ComponentGenerationPanelModule,
    ComponentPropertyModule,
  ],
  exports: [ComponentGenerationTabComponent],
})
export class ComponentGenerationTabModule {}
