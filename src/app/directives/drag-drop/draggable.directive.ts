import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { DragDropService } from './drag-drop.service';
import { DragEffect } from './drag-drop.enum';
import { Container } from 'src/app/mixins/mixins';
import { ComponentProperty } from 'src/app/component-generation/component-property/component.property';

export interface DraggableComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> {
  parentContainer?: Container<TBuildingBlock>;
  hostView?: ViewRef;
  elementRef?: ElementRef<HTMLElement>;
}

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> implements AfterViewInit, OnDestroy
{
  @Input() dragData: any;
  @Input() dragEffect!: DragEffect;
  @Input() component!: DraggableComponent<TBuildingBlock>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private dragDropService: DragDropService<TBuildingBlock>
  ) {}
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.setAttribute('draggable', 'true');

    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener(
        'dragstart',
        this.onDragStart.bind(this)
      );
      this.elementRef.nativeElement.addEventListener(
        'dragend',
        this.onDragEnd.bind(this)
      );
    });
  }

  onDragStart(event: DragEvent): void {
    event.stopPropagation();
    this.dragDropService.setCurrentDragInfo({
      data: this.dragData,
      dragEffect: this.dragEffect,
      component: this.component,
    });
    event.dataTransfer?.setDragImage(
      this.elementRef.nativeElement,
      this.elementRef.nativeElement.offsetWidth / 2,
      this.elementRef.nativeElement.offsetHeight / 2
    );
    event.dataTransfer!.dropEffect = this.dragEffect;
  }

  onDragEnd(_event: DragEvent): void {
    this.dragDropService.clearCurrentDragInfo();
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener(
      'dragstart',
      this.onDragStart.bind(this)
    );
    this.elementRef.nativeElement.removeEventListener(
      'dragend',
      this.onDragEnd.bind(this)
    );
  }
}
