import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { DragEffect } from './drag-drop.enum';
import { DraggableComponent } from './draggable.directive';

export interface DragInfo {
  data: any;
  component: DraggableComponent;
  // If dragEffect = 'move', then the currentViewContainerRef must be set
  dragEffect: DragEffect;
}

@Injectable()
export class DragDropService {
  public dragInfo: DragInfo | null = null;

  setCurrentDragInfo(dragInfo: DragInfo): void {
    this.dragInfo = dragInfo;
  }

  clearCurrentDragInfo(): void {
    this.dragInfo = null;
  }
}
