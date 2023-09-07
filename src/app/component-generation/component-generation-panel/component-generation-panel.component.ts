import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { dropComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from '../container/container-host.directive';
import { DropData } from 'src/app/directives/drag-drop/drop-zone.directive';
import { ComponentPropertyFactory } from '../component-property/component-property-factory.service';
import { ComponentProperty } from '../component-property/component.property';
import { ComponentPropertyService } from '../component-generation-tab/component-property.service';
import { v4 } from 'uuid';
import { Selectable } from '../selectable';
import { BuildingBlockComponent } from '../building-block.component';
import { ComponentGenerationService } from 'src/app/services/api/clients/componentGeneration.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-component-generation-panel',
  templateUrl: './component-generation-panel.component.html',
  styleUrls: ['./component-generation-panel.component.scss'],
})
export class ComponentGenerationPanelComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> implements OnInit, Selectable
{
  @Input() framework!: string;

  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;

  @ViewChildren(BuildingBlockComponent<TBuildingBlock>) children!: QueryList<
    BuildingBlockComponent<TBuildingBlock>
  >;

  id!: string;
  property?: ComponentProperty<TBuildingBlock>;
  selected: boolean = true;
  formGroup!: FormGroup;

  constructor(
    private componentResolver: ComponentResolver,
    private componentPropertyFactory: ComponentPropertyFactory,
    private componentPropertyService: ComponentPropertyService,
    private componentGenerationService: ComponentGenerationService
  ) {}

  ngOnInit(): void {
    this.id = v4();
    this.property = this.componentPropertyFactory.createComponentProperty(
      this.framework
    );
    this.formGroup = this.componentPropertyService.registerComponentProperty(
      this.id,
      this.property,
      this,
      'Component'
    );
    this.componentPropertyService.onComponentSelected(this.id, this);
  }

  onComponentDropped(dropData: DropData): void {
    dropComponent(
      dropData,
      this.containerHost.viewContainerRef,
      this.componentResolver,
      this.framework
    );
  }

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this.id, this);
  }

  generate(): void {
    const formGroup =
      this.componentPropertyService.getComponentPropertyFormGroup(this.id);

    if (!formGroup.valid) {
      throw new Error(
        'Please fix all the errors in the component property configuration before generation!'
      );
    }

    this.property?.copyFrom(formGroup.value);
    this.property?.setChildren(
      this.children.map((c) => c.getProperty() as TBuildingBlock)
    );
    this.componentGenerationService.generateAngularComponent(this.property);
  }
}
