import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationPanelComponent } from './component-generation-panel.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerModule } from '../container/container.module';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  declarations: [ComponentGenerationPanelComponent],
  imports: [CommonModule, CdkDropList, ContainerModule, DndModule],
  exports: [ComponentGenerationPanelComponent],
  providers: [ComponentResolver],
})
export class ComponentGenerationPanelModule {}
