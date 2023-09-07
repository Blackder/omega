import { Directive, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ComponentProperty } from './component-property/component.property';
import { ComponentPropertyService } from './component-generation-tab/component-property.service';
import { v4 } from 'uuid';

@Directive()
export abstract class BuildingBlockComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> implements OnInit
{
  id!: string;
  protected property!: ComponentProperty<TBuildingBlock>;

  @ViewChildren(BuildingBlockComponent) children!: QueryList<
    BuildingBlockComponent<TBuildingBlock>
  >;

  constructor(protected componentPropertyService: ComponentPropertyService) {
    this.id = v4();
  }

  ngOnInit(): void {
    this.property = this.initializeProperty();
  }

  abstract initializeProperty(): ComponentProperty<TBuildingBlock>;

  getProperty(): ComponentProperty<TBuildingBlock> {
    this.property.copyFrom(
      this.componentPropertyService.getComponentPropertyFormGroup(this.id).value
    );
    this.property.setChildren(
      this.children?.map((c) => c.getProperty() as TBuildingBlock)
    );
    return this.property;
  }
}
