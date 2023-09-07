import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  ViewRef,
  forwardRef,
} from '@angular/core';
import { Container, dropComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from './container-host.directive';
import { DropData } from 'src/app/directives/drag-drop/drop-zone.directive';
import { DragEffect } from 'src/app/directives/drag-drop/drag-drop.enum';
import { BuildingBlockComponent } from '../building-block.component';
import { ComponentProperty } from '../component-property/component.property';
import { ComponentPropertyFactory } from '../component-property/component-property-factory.service';
import { v4 } from 'uuid';
import { ComponentPropertyService } from '../component-generation-tab/component-property.service';
import { Selectable } from '../selectable';
import { DraggableComponent } from 'src/app/directives/drag-drop/draggable.directive';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [
    {
      provide: BuildingBlockComponent,
      useExisting: forwardRef(() => ContainerComponent),
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ContainerComponent<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >
  extends BuildingBlockComponent<TBuildingBlock>
  implements
    OnInit,
    AfterViewInit,
    DraggableComponent<TBuildingBlock>,
    Selectable
{
  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;
  @Input() data!: any;
  @Input() parentContainer!: Container<TBuildingBlock>;
  @Input() hostView!: ViewRef;
  @Input() framework!: string;
  moveEffect = DragEffect.move;
  selected: boolean = false;

  private container!: Container<TBuildingBlock>;

  constructor(
    private componentResolver: ComponentResolver,
    private componentPropertyFactory: ComponentPropertyFactory,
    componentPropertyService: ComponentPropertyService,
    public elementRef: ElementRef<HTMLElement>
  ) {
    super(componentPropertyService);
  }

  ngAfterViewInit(): void {
    this.container = new Container(this.containerHost.viewContainerRef);
  }

  override initializeProperty(): ComponentProperty<TBuildingBlock> {
    const property = this.componentPropertyFactory.createBuildingBlockProperty(
      this.framework
    );

    this.componentPropertyService.registerComponentProperty(
      this.id,
      property,
      this,
      this.data
    );

    setTimeout(() => {
      this.componentPropertyService.onComponentSelected(this.id, this);
    });

    return property;
  }

  onDropped(dropData: DropData<TBuildingBlock>): void {
    dropComponent(
      dropData,
      this.container,
      this.componentResolver,
      this.framework
    );
  }

  remove(): void {
    this.parentContainer.remove(this.hostView);
  }

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this.id, this);
  }

  override getProperty(): ComponentProperty<TBuildingBlock> {
    const property = super.getProperty();
    
    property.setChildren(
      this.container.children.map((c) => c.getProperty() as TBuildingBlock)
    );

    return property;
  }
}
