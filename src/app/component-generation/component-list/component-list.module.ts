import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentListComponent } from './component-list.component';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';

@NgModule({
  declarations: [ComponentListComponent],
  imports: [CommonModule, DragDropModule],
  exports: [ComponentListComponent],
})
export class ComponentListModule {}
