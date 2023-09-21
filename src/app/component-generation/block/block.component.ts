import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import { Container, Destroyable, dropComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from './container-host.directive';
import { DropData } from 'src/app/directives/drag-drop/drop-zone.directive';
import { DragEffect } from 'src/app/directives/drag-drop/drag-drop.enum';
import { ComponentProperty } from '../component-property/component.property';
import { ComponentPropertyFactory } from '../component-property/component-property-factory.service';
import { v4 } from 'uuid';
import { ComponentPropertyService } from '../component-generation-tab/component-property.service';
import { ContainerBlock } from '../block';
import { DraggableComponent } from 'src/app/directives/drag-drop/draggable.directive';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlockComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> implements
    OnInit,
    AfterViewInit,
    OnDestroy,
    Destroyable,
    ContainerBlock<TBuildingBlock>,
    DraggableComponent<TBuildingBlock>
{
  @ViewChild(ContainerHostDirective)
  containerHost!: ContainerHostDirective;
  @Input() name!: any;
  @Input() parentContainer!: Container<TBuildingBlock>;
  @Input() hostView!: ViewRef;
  @Input() framework!: string;
  @Input() isDropContainer: boolean = true;
  @Input() componentToCopyId?: string;
  @Input() children?: BlockComponent<TBuildingBlock>[];

  displayName!: string;
  protected property!: ComponentProperty<TBuildingBlock>;
  formGroup!: FormGroup;
  selected: boolean = false;
  private destroyed = new Subject<void>();
  destroyed$ = this.destroyed.asObservable();
  moveEffect = DragEffect.move;
  id!: string;

  container!: Container<TBuildingBlock>;

  constructor(
    private componentResolver: ComponentResolver,
    private componentPropertyFactory: ComponentPropertyFactory,
    private componentPropertyService: ComponentPropertyService,
    public elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.id = v4();
  }

  ngOnInit(): void {
    this.displayName = this.name;
    this.property = this.initializeProperty();

    if (this.componentToCopyId) {
      this.formGroup =
        this.componentPropertyService.registerWithPropertyFromExistingComponent(
          this.id,
          this.componentToCopyId,
          this,
          this.name
        );
    } else {
      this.formGroup = this.componentPropertyService.registerComponentProperty(
        this.id,
        this.property,
        this,
        this.name
      );
    }

    setTimeout(() => {
      this.componentPropertyService.onComponentSelected(this);
    });
  }

  protected initializeProperty(): ComponentProperty<TBuildingBlock> {
    const property = this.componentPropertyFactory.createBuildingBlockProperty(
      this.framework,
      this.name
    );

    return property;
  }

  ngAfterViewInit(): void {
    if (this.isDropContainer) {
      this.container = new Container(this.containerHost.viewContainerRef);
    }
    if (this.children) {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];

        dropComponent(
          {
            component: child,
            data: child.name,
            dragEffect: DragEffect.copy,
            index: i,
          },
          this.container,
          this.componentResolver,
          this.framework,
          child.id,
          child.container?.children
        );
      }

      this.changeDetectorRef.detectChanges();
    }
  }

  onDropped(dropData: DropData<TBuildingBlock>): void {
    dropComponent(
      dropData,
      this.container,
      this.componentResolver,
      this.framework
    );
  }

  remove(event: Event): void {
    event.stopPropagation();
    this.parentContainer.remove(this.hostView);
    this.componentPropertyService.onComponentRemoved(this);
  }

  getProperty(): ComponentProperty<TBuildingBlock> {
    this.property.copyFrom(this.formGroup.value);

    if (this.container?.children.length > 0) {
      this.property.setChildren(
        this.container.children.map((c) => c.getProperty() as TBuildingBlock)
      );
    }

    return this.property;
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this);
  }

  duplicate(): void {
    dropComponent(
      {
        data: this.name,
        dragEffect: DragEffect.copy,
      },
      this.parentContainer,
      this.componentResolver,
      this.framework,
      this.id,
      this.container.children
    );
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
