import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { DragEffect } from './drag-drop.enum';
import { DraggableComponent } from './draggable.directive';
import { ComponentProperty } from 'src/app/component-generation/component-property/component.property';

export interface DragInfo<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> {
  data: any;
  component: DraggableComponent<TBuildingBlock>;
  // If dragEffect = 'move', then the currentViewContainerRef must be set
  dragEffect: DragEffect;
}

@Injectable()
export class DragDropService<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> {
  public dragInfo: DragInfo<TBuildingBlock> | null = null;

  setCurrentDragInfo(dragInfo: DragInfo<TBuildingBlock>): void {
    this.dragInfo = dragInfo;
  }

  clearCurrentDragInfo(): void {
    this.dragInfo = null;
  }
}
