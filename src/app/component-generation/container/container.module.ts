import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ContainerHostDirective } from './container-host.directive';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  declarations: [ContainerComponent, ContainerHostDirective],
  imports: [CommonModule, DndModule],
  providers: [ComponentResolver],
  exports: [ContainerComponent, ContainerHostDirective],
})
export class ContainerModule {}
