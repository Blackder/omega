import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentListComponent } from './component-list.component';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  declarations: [ComponentListComponent],
  imports: [CommonModule, DndModule],
  exports: [ComponentListComponent],
})
export class ComponentListModule {}
