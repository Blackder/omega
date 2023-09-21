import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationTabComponent } from './component-generation-tab.component';
import { ComponentListModule } from '../component-list/component-list.module';
import { ComponentGenerationPanelModule } from '../component-generation-panel/component-generation-panel.module';
import { ComponentPropertyModule } from '../component-property/component-property.module';
import { FormService } from './form.service';

@NgModule({
  declarations: [ComponentGenerationTabComponent],
  imports: [
    CommonModule,
    ComponentListModule,
    ComponentGenerationPanelModule,
    ComponentPropertyModule,
  ],
  providers: [FormService],
  exports: [ComponentGenerationTabComponent],
})
export class ComponentGenerationTabModule {}
