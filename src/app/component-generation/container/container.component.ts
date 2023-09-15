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
import { ContainerBlock } from '../block';
import { DraggableComponent } from 'src/app/directives/drag-drop/draggable.directive';
import { FormGroup } from '@angular/forms';

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
  implements OnInit, AfterViewInit, DraggableComponent<TBuildingBlock>
{
  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;
  @Input() data!: any;
  @Input() parentContainer!: Container<TBuildingBlock>;
  @Input() hostView!: ViewRef;
  @Input() framework!: string;
  moveEffect = DragEffect.move;

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

    return property;
  }

  override registerComponentProperty(
    id: string,
    property: ComponentProperty<TBuildingBlock>
  ): FormGroup<any> {
    return this.componentPropertyService.registerComponentProperty(
      id,
      property,
      this,
      this.data
    );
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

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this);
  }

  protected override getFormGroupValue(): any {
    const value = super.getFormGroupValue();
    value.name = this.data;
    return value;
  }

  override getProperty(): ComponentProperty<TBuildingBlock> {
    const property = super.getProperty();

    property.setChildren(
      this.container.children.map((c) => c.getProperty() as TBuildingBlock)
    );

    return property;
  }
}
