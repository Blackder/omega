import { ViewContainerRef, ViewRef } from '@angular/core';
import { ComponentResolver } from '../services/component-resolver.service';
import { DropData } from '../directives/drag-drop/drop-zone.directive';
import { DragEffect } from '../directives/drag-drop/drag-drop.enum';

export function dropComponent(
  dropData: DropData,
  viewContainerRef: ViewContainerRef,
  componentResolver: ComponentResolver
) {
  if (dropData.dragEffect == DragEffect.move) {
    const viewRef = dropData.component.parentContainerRef?.detach(
      dropData.component.parentContainerRef.indexOf(
        dropData.component.hostView as ViewRef
      )
    ) as ViewRef;
    viewContainerRef.move(viewRef, dropData.index);
    dropData.component.parentContainerRef = viewContainerRef;
    dropData.component.hostView = viewRef;
  } else {
    insertComponent(
      viewContainerRef,
      componentResolver,
      dropData.data,
      dropData.data,
      dropData.index
    );
  }
}

function insertComponent(
  viewContainerRef: ViewContainerRef,
  componentResolver: ComponentResolver,
  componentName: string,
  data: any,
  atIndex?: number
): void {
  const componentRef = viewContainerRef.createComponent(
    componentResolver.resolve(componentName),
    { index: atIndex }
  );
  componentRef.setInput('data', data);
  componentRef.setInput('parentContainerRef', viewContainerRef);
  componentRef.setInput('hostView', componentRef.hostView);
}
