import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { ContainerHostDirective } from './container-host.directive';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';
import { ComponentPropertyDisplayModule } from '../component-property/component-property-display/component-property-display.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [BlockComponent, ContainerHostDirective],
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ComponentPropertyDisplayModule,
  ],
  providers: [ComponentResolver],
  exports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    ComponentPropertyDisplayModule,
    BlockComponent,
    ContainerHostDirective,
  ],
})
export class BlockModule {}
