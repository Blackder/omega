import {
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
import { dropComponent } from 'src/app/mixins/mixins';
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
  implements OnInit, Selectable
{
  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;
  @Input() data!: any;
  @Input() parentContainerRef!: ViewContainerRef;
  @Input() hostView!: ViewRef;
  @Input() framework!: string;
  moveEffect = DragEffect.move;
  selected: boolean = false;

  constructor(
    private componentResolver: ComponentResolver,
    private componentPropertyFactory: ComponentPropertyFactory,
    componentPropertyService: ComponentPropertyService,
    public elementRef: ElementRef<HTMLElement>
  ) {
    super(componentPropertyService);
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

  onDropped(dropData: DropData): void {
    dropComponent(
      dropData,
      this.containerHost.viewContainerRef,
      this.componentResolver,
      this.framework
    );
  }

  remove(): void {
    this.parentContainerRef.remove(
      this.parentContainerRef.indexOf(this.hostView)
    );
  }

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this.id, this);
  }
}
