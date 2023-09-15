import {
  Directive,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ComponentProperty } from './component-property/component.property';
import { ComponentPropertyService } from './component-generation-tab/component-property.service';
import { v4 } from 'uuid';
import { FormGroup } from '@angular/forms';
import { Block } from './block';
import { Destroyable } from '../mixins/mixins';
import { Subject } from 'rxjs';

@Directive()
export abstract class BuildingBlockComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> implements OnInit, Block, OnDestroy, Destroyable
{
  id!: string;
  protected property!: ComponentProperty<TBuildingBlock>;
  formGroup!: FormGroup;
  selected: boolean = false;
  private destroyed = new Subject<void>();
  destroyed$ = this.destroyed.asObservable();

  @ViewChildren(BuildingBlockComponent) children!: QueryList<
    BuildingBlockComponent<TBuildingBlock>
  >;

  constructor(protected componentPropertyService: ComponentPropertyService) {
    this.id = v4();
  }

  ngOnInit(): void {
    this.property = this.initializeProperty();
    this.formGroup = this.registerComponentProperty(this.id, this.property);

    setTimeout(() => {
      this.componentPropertyService.onComponentSelected(this);
    });
  }

  abstract initializeProperty(): ComponentProperty<TBuildingBlock>;

  abstract registerComponentProperty(
    id: string,
    property: ComponentProperty<TBuildingBlock>
  ): FormGroup<any>;

  getProperty(): ComponentProperty<TBuildingBlock> {
    this.property.copyFrom(this.getFormGroupValue());
    return this.property;
  }

  protected getFormGroupValue(): any {
    return this.formGroup.value;
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
