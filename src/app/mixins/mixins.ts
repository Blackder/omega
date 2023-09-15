import { ComponentRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { ComponentResolver } from '../services/component-resolver.service';
import { DropData } from '../directives/drag-drop/drop-zone.directive';
import { DragEffect } from '../directives/drag-drop/drag-drop.enum';
import { ComponentProperty } from '../component-generation/component-property/component.property';
import { BuildingBlockComponent } from '../component-generation/building-block.component';
import { Observable, map, mapTo, merge, of, switchMap, timer } from 'rxjs';

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
  const componentData = componentResolver.resolve(componentName);

  const componentRef = container.insert(componentData.component, atIndex);
  componentRef.setInput('name', data);
  componentRef.setInput('isDropContainer', componentData.isDropContainer);
  componentRef.setInput('parentContainer', container);
  componentRef.setInput('hostView', componentRef.hostView);
  componentRef.setInput('framework', framework);
}

/**
 * Emits a true value and, after the given displayMs, emits a false value.
 * Purpose is a quick toggle action, such as a button shaking after a form is
 * submitted while invalid.
 */
export function toggleFor(displayMs: number) {
  return (source: Observable<any>) =>
    new Observable<any>((subscriber) => {
      return source
        .pipe(
          map(() => true),
          switchMap((val) =>
            merge(of(val), timer(displayMs).pipe(map(() => false)))
          )
        )
        .subscribe({
          next: (v) => subscriber.next(v),
          error: (e) => subscriber.error(e),
          complete: () => subscriber.complete(),
        });
    });
}

export interface Destroyable {
  destroyed$: Observable<void>;
}
