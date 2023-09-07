import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { DragDropService } from './drag-drop.service';
import { DragEffect } from './drag-drop.enum';
import { DraggableComponent } from './draggable.directive';
import { DropPlaceholderDirective } from './drop-placeholder.directive';

export interface DropData {
  data: any;
  index: number;
  dragEffect: DragEffect;
  component: DraggableComponent;
}

@Directive({
  selector: '[appDropZone]',
})
export class DropZoneDirective implements AfterViewInit, OnDestroy {
  private minOffsetY = -1;
  private maxOffsetY = -1;
  private placeholderIndex = -1;
  // When moving the component in the same container, then the component index should be placeholder index - 1
  private movingComponentInSameContainer = false;
  private placeholder: HTMLElement | null = null;
  private dragCount = 1;

  @ContentChild(DropPlaceholderDirective)
  placeholderDirective?: DropPlaceholderDirective;

  @Output() dropped = new EventEmitter<DropData>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private dragDropService: DragDropService,
    private renderer: Renderer2
  ) {}

  private reset(): void {
    this.minOffsetY = -1;
    this.maxOffsetY = -1;
    this.movingComponentInSameContainer = false;
    this.removePlaceholder();
  }

  private onDragOver(event: DragEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    const prevIndex = this.placeholderIndex;
    this.calculatePlaceholderIndex(event);
    this.updatePlaceholder(prevIndex, this.placeholderIndex);
  }

  private updatePlaceholder(prevIndex: number, curIndex: number): void {
    if (prevIndex === curIndex || this.placeholderIndex === -1) {
      return;
    }

    this.placeholder?.parentNode?.removeChild(this.placeholder);
    console.log('Before update');
    console.log(this.dragCount);
    console.log(this.elementRef.nativeElement.children);
    console.log('Placeholder index: ' + this.placeholderIndex);

    if (!this.placeholderDirective) {
      return;
    }

    if (
      this.placeholderIndex === this.elementRef.nativeElement.children.length
    ) {
      this.renderer.appendChild(
        this.elementRef.nativeElement,
        this.placeholder
      );
    } else {
      if (
        this.placeholderIndex + 1 <=
        this.elementRef.nativeElement.children.length
      ) {
        console.log('Insert before');
        this.renderer.insertBefore(
          this.elementRef.nativeElement,
          this.placeholder,
          this.elementRef.nativeElement.children[this.placeholderIndex]
        );
      } else {
        this.renderer.appendChild(
          this.elementRef.nativeElement,
          this.placeholder
        );
      }
    }
    // if (!this.placeholder) {
    //   console.log(this.placeholderRef);
    //   this.placeholder = this.viewContainerRef.createEmbeddedView(
    //     this.placeholderRef,
    //     null,
    //     {
    //       index:
    //         this.placeholderIndex <
    //         this.elementRef.nativeElement.children.length
    //           ? this.placeholderIndex
    //           : undefined,
    //     }
    //   );
    //   console.log('After update');
    //   console.log(this.dragCount);
    //   console.log(this.viewContainerRef);
    //   console.log('Diff');
    //   return;
    // }

    // const viewRef = this.viewContainerRef.detach(prevIndex) as ViewRef;
    // this.viewContainerRef.insert(viewRef, curIndex);
    // console.log('After update');
    // console.log(this.dragCount);
    // console.log(this.viewContainerRef);
    // console.log('Diff');
  }

  private calculatePlaceholderIndex(event: DragEvent): void {
    console.log('======================CALCULATION========================');
    console.log('Min Y: ' + this.minOffsetY);
    console.log('Max Y: ' + this.maxOffsetY);
    console.log('Event Y: ' + event.y);
    console.log(
      'Condition: ' + this.minOffsetY + '!== -1 ' + (this.minOffsetY !== -1)
    );
    console.log(
      'Condition: ' + this.maxOffsetY + '!== -1 ' + (this.maxOffsetY !== -1)
    );
    console.log(
      'Condition: ' +
        event.offsetY +
        '>=' +
        this.minOffsetY +
        ' ' +
        (event.offsetY >= this.minOffsetY)
    );
    console.log(
      'Condition: ' +
        event.offsetY +
        '<=' +
        this.maxOffsetY +
        ' ' +
        (event.offsetY <= this.maxOffsetY)
    );
    if (
      this.dragDropService.dragInfo?.component?.elementRef?.nativeElement ===
        this.elementRef.nativeElement ||
      this.dragDropService.dragInfo?.component?.elementRef?.nativeElement.contains(
        this.elementRef.nativeElement
      ) ||
      (this.minOffsetY !== -1 &&
        this.maxOffsetY !== -1 &&
        event.y >= this.minOffsetY &&
        event.y <= this.maxOffsetY)
    ) {
      console.log('Skip calculation');
      return;
    }

    const childrenLength = this.elementRef.nativeElement.children.length;

    if (childrenLength === 0) {
      this.minOffsetY = 0;
      this.maxOffsetY = Number.MAX_VALUE;
      this.placeholderIndex = 0;
      console.log('Min Y: ' + this.minOffsetY);
      console.log('Max Y: ' + this.maxOffsetY);
      return;
    }

    for (let i = 0; i < childrenLength; i++) {
      const element = this.elementRef.nativeElement.children[i] as HTMLElement;
      if (
        this.dragDropService.dragInfo?.component?.elementRef?.nativeElement ===
        element
      ) {
        this.movingComponentInSameContainer = true;
      }
      const nextElement =
        i + 1 < this.elementRef.nativeElement.children.length
          ? (this.elementRef.nativeElement.children[i + 1] as HTMLElement)
          : null;
      const nextElementRect = nextElement?.getBoundingClientRect();

      const elementRect = element.getBoundingClientRect();
      const elementBottomY = elementRect.bottom;

      if (
        event.y >= elementBottomY &&
        (!nextElementRect || event.y <= nextElementRect.top)
      ) {
        this.minOffsetY = elementBottomY;
        this.maxOffsetY = nextElementRect?.top ?? Number.MAX_VALUE;
        this.placeholderIndex = i + 1;
        console.log(this.elementRef.nativeElement.children);
        console.log('Placeholder index: ' + this.placeholderIndex);
      } else if (event.y < elementBottomY) {
        this.minOffsetY = 0;
        this.maxOffsetY = elementBottomY;
        this.placeholderIndex = i;
        console.log('Placeholder index: ' + this.placeholderIndex);
        break;
      }
    }

    console.log('Min Y: ' + this.minOffsetY);
    console.log('Max Y: ' + this.maxOffsetY);
    console.log(
      '======================CALCULATION END========================'
    );
  }

  removePlaceholder(): void {
    if (this.placeholder) {
      // console.log('Remove placeholder');
      // console.log('Placeholder index: ' + this.placeholderIndex);
      // console.log('Container length: ' + this.viewContainerRef.length);
      // this.viewContainerRef.remove(this.placeholderIndex + 1);
      this.placeholder.parentNode?.removeChild(this.placeholder);
      this.placeholderIndex = -1;
    }
  }

  private onDragLeave(event: DragEvent): void {
    event.stopPropagation();

    console.log('Drag leave: ');
    console.log(this.elementRef.nativeElement);
    console.log(event.y);
    console.log('Placeholder index: ' + this.placeholderIndex);
    this.reset();
  }

  private onDrop(event: DragEvent): void {
    const index = this.movingComponentInSameContainer
      ? this.placeholderIndex - 1
      : this.placeholderIndex;

    if (event.defaultPrevented || this.placeholderIndex === -1) {
      return;
    }

    if (index === -1) {
      this.reset();
      return;
    }

    event.preventDefault();

    this.dropped.emit({
      data: this.dragDropService.dragInfo!.data,
      index,
      dragEffect: this.dragDropService.dragInfo!.dragEffect,
      component: this.dragDropService.dragInfo!.component,
    });
    this.reset();
  }

  ngAfterViewInit(): void {
    this.tryGetPlaceholder();

    this.placeholder?.parentNode?.removeChild(this.placeholder);

    this.placeholder?.parentNode;

    this.ngZone.runOutsideAngular(() => {});
    // Drop event must be in Angular zone in order for the change detection to run
    // when the component is created
    this.elementRef.nativeElement.addEventListener(
      'dragover',
      this.onDragOver.bind(this)
    );
    this.elementRef.nativeElement.addEventListener(
      'dragleave',
      this.onDragLeave.bind(this)
    );
    this.elementRef.nativeElement.addEventListener(
      'drop',
      this.onDrop.bind(this)
    );
  }

  tryGetPlaceholder(): void {
    if (this.placeholderDirective) {
      this.placeholder = this.placeholderDirective.elementRef.nativeElement;
    }
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener(
      'dragover',
      this.onDragOver.bind(this)
    );
    this.elementRef.nativeElement.removeEventListener(
      'dragleave',
      this.onDragLeave.bind(this)
    );
    this.elementRef.nativeElement.removeEventListener(
      'drop',
      this.onDrop.bind(this)
    );
  }
}
