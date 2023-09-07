import { ComponentRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { ComponentResolver } from '../services/component-resolver.service';
import { DropData } from '../directives/drag-drop/drop-zone.directive';
import { DragEffect } from '../directives/drag-drop/drag-drop.enum';
import { ComponentProperty } from '../component-generation/component-property/component.property';
import { BuildingBlockComponent } from '../component-generation/building-block.component';

export class Container<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> {
  public children: BuildingBlockComponent<TBuildingBlock>[] = [];
  constructor(public viewContainerRef: ViewContainerRef) {}

  insert(componentType: Type<unknown>, index?: number): ComponentRef<unknown> {
    const componentRef = this.viewContainerRef.createComponent(componentType, {
      index,
    });
    if (index) {
      this.children.splice(
        index,
        0,
        componentRef.instance as BuildingBlockComponent<TBuildingBlock>
      );
    } else {
      this.children.push(
        componentRef.instance as BuildingBlockComponent<TBuildingBlock>
      );
    }

    return componentRef;
  }

  move(
    toIndex: number,
    toMove: {
      viewRef: ViewRef;
      component: BuildingBlockComponent<TBuildingBlock>;
    }
  ): void {
    this.viewContainerRef.move(toMove.viewRef, toIndex);
    this.children.splice(toIndex, 0, toMove.component);
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

export function dropComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
>(
  dropData: DropData<TBuildingBlock>,
  container: Container<TBuildingBlock>,
  componentResolver: ComponentResolver,
  framework: string
) {
  if (dropData.dragEffect == DragEffect.move) {
    const removed = dropData.component.parentContainer!.remove(
      dropData.component.hostView as ViewRef
    );
    container.move(dropData.index, removed);
    dropData.component.parentContainer = container;
    dropData.component.hostView = removed.viewRef;
  } else {
    insertComponent(
      container,
      componentResolver,
      dropData.data,
      dropData.data,
      framework,
      dropData.index
    );
  }
}

function insertComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
>(
  container: Container<TBuildingBlock>,
  componentResolver: ComponentResolver,
  componentName: string,
  data: any,
  framework: string,
  atIndex?: number
): void {
  const componentRef = container.insert(
    componentResolver.resolve(componentName),
    atIndex
  );
  componentRef.setInput('data', data);
  componentRef.setInput('parentContainer', container);
  componentRef.setInput('hostView', componentRef.hostView);
  componentRef.setInput('framework', framework);
}
