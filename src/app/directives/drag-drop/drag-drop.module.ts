import { NgModule, ViewContainerRef, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './drop-zone.directive';
import { DraggableDirective } from './draggable.directive';
import { DragDropService } from './drag-drop.service';
import { DropPlaceholderDirective } from './drop-placeholder.directive';

@NgModule({
  declarations: [
    DropZoneDirective,
    DropPlaceholderDirective,
    DraggableDirective,
  ],
  imports: [CommonModule],
  providers: [DragDropService],
  exports: [
    DropZoneDirective,
    DraggableDirective,
    DropPlaceholderDirective,
  ],
})
export class DragDropModule {}
