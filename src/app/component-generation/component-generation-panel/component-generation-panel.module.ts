import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentGenerationPanelComponent } from './component-generation-panel.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import {
  AngularComponentResolver,
  ComponentResolver,
} from 'src/app/services/component-resolver.service';
import { BlockModule } from '../block/block.module';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';
import { FileDownloadService } from './file-download.service';
import { ComponentPropertyDisplayModule } from '../component-property/component-property-display/component-property-display.module';
import { AngularComponentsModule } from '../angular-components/angular-components.module';

@NgModule({
  declarations: [ComponentGenerationPanelComponent],
  imports: [
    CommonModule,
    CdkDropList,
    BlockModule,
    AngularComponentsModule,
    MatButtonModule,
    DragDropModule,
    ComponentPropertyDisplayModule,
  ],
  exports: [ComponentGenerationPanelComponent],
  providers: [AngularComponentResolver, ComponentResolver, FileDownloadService],
})
export class ComponentGenerationPanelModule {}
