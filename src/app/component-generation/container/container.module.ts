import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerHostDirective } from './container-host.directive';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';
import { ComponentPropertyDisplayModule } from '../component-property/component-property-display/component-property-display.module';

@NgModule({
  declarations: [ContainerComponent, ContainerHostDirective],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    ComponentPropertyDisplayModule,
  ],
  providers: [ComponentResolver],
  exports: [ContainerComponent, ContainerHostDirective],
})
export class ContainerModule {}
