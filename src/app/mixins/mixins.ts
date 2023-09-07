import { ComponentRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { ComponentResolver } from '../services/component-resolver.service';
import { DropData } from '../directives/drag-drop/drop-zone.directive';
import { DragEffect } from '../directives/drag-drop/drag-drop.enum';
import { ComponentProperty } from '../component-generation/component-property/component.property';
import { BuildingBlockComponent } from '../component-generation/building-block.component';

export class Container<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> {
  private children: BuildingBlockComponent<TBuildingBlock>[] = [];
  constructor(private viewContainerRef: ViewContainerRef) {}

  insert(index: number, componentType: Type<unknown>): ComponentRef<unknown> {
    const componentRef = this.viewContainerRef.createComponent(componentType, {
      index,
    });
    this.children.splice(
      index,
      0,
      componentRef.instance as BuildingBlockComponent<TBuildingBlock>
    );
    return componentRef;
  }

  remove(hostView: ViewRef): {
    viewRef: ViewRef;
    component: BuildingBlockComponent<TBuildingBlock>;
  } {
    const index = this.viewContainerRef.indexOf(hostView as ViewRef);
    const viewRef = this.viewContainerRef.detach(index) as ViewRef;
    const component = this.children.splice(index, 1)[0];

    return {
      viewRef,
      component,
    };
  }
}

export function dropComponent(
  dropData: DropData,
  viewContainerRef: ViewContainerRef,
  componentResolver: ComponentResolver,
  framework: string
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
      framework,
      dropData.index
    );
  }
}

function insertComponent(
  viewContainerRef: ViewContainerRef,
  componentResolver: ComponentResolver,
  componentName: string,
  data: any,
  framework: string,
  atIndex?: number
): void {
  const componentRef = viewContainerRef.createComponent(
    componentResolver.resolve(componentName),
    { index: atIndex }
  );
  componentRef.setInput('data', data);
  componentRef.setInput('parentContainerRef', viewContainerRef);
  componentRef.setInput('hostView', componentRef.hostView);
  componentRef.setInput('framework', framework);
}
