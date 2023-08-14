import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationScreenComponent } from './component-generation-screen.component';
import { ComponentListModule } from '../component-list/component-list.module';
import { ComponentGenerationPanelModule } from '../component-generation-panel/component-generation-panel.module';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ComponentGenerationScreenComponent],
  imports: [
    CommonModule,
    ComponentListModule,
    ComponentGenerationPanelModule,
    CdkDropListGroup,
  ],
  exports: [ComponentGenerationScreenComponent],
})
export class ComponentGenerationScreenModule {}
