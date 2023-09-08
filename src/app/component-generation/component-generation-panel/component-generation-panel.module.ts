import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationPanelComponent } from './component-generation-panel.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerModule } from '../container/container.module';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';
import { FileDownloadService } from './file-download.service';
import { ComponentPropertyDisplayModule } from '../component-property/component-property-display/component-property-display.module';

@NgModule({
  declarations: [ComponentGenerationPanelComponent],
  imports: [
    CommonModule,
    CdkDropList,
    ContainerModule,
    MatButtonModule,
    DragDropModule,
    ComponentPropertyDisplayModule,
  ],
  exports: [ComponentGenerationPanelComponent],
  providers: [ComponentResolver, FileDownloadService],
})
export class ComponentGenerationPanelModule {}
