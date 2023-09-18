import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentListComponent } from './component-list.component';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ComponentListComponent],
  imports: [CommonModule, DragDropModule, MatIconModule],
  exports: [ComponentListComponent],
})
export class ComponentListModule {}
