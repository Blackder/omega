import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ComponentProperty } from '../component-property/component.property';
import { Block, ContainerBlock } from '../block';
import { Destroyable } from 'src/app/mixins/mixins';
import { FormService } from './form.service';
import { FormControlMetadata } from '../component-property/component-property-form/form.util';

export interface ComponentPropertyForm {
  formGroup: FormGroup;
  component: Block;
  name: string;
}

@Injectable()
export class ComponentPropertyService {
  private currentSelected: Block | null = null;
  private firstSelected: Block | null = null;
  private map: {
    [componentId: string]: ComponentPropertyForm;
  } = {};
  private selectedPropertySubject =
    new BehaviorSubject<ComponentPropertyForm | null>(null);
  public selectedProperty$ = this.selectedPropertySubject.asObservable();

  constructor(private formService: FormService) {}

  registerComponentProperty<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >(
    componentId: string,
    componentProperty: ComponentProperty<TBuildingBlock>,
    component: Block & Destroyable,
    name: string
  ): FormGroup {
    if (this.map[componentId]) {
      return this.map[componentId].formGroup;
    }
    // Build the form based on the component property
    const formGroup = this.formService.getControl(
      componentProperty.constructor,
      componentProperty,
      componentProperty
    ) as FormGroup;
    this.map[componentId] = { formGroup, component, name };
    console.log(formGroup);
    return formGroup;
  }

  registerWithPropertyFromExistingComponent(
    componentId: string,
    componentToCopyId: string,
    component: Block & Destroyable,
    name: string
  ): FormGroup {
    const existingProperty = this.map[componentToCopyId];

    if (!existingProperty) {
      throw new Error(
        `There is no component with Id = ${componentToCopyId} to copy.`
      );
    }

    this.map[componentId] = {
      formGroup: new FormControlMetadata(existingProperty.formGroup, '').clone(
        this.formService
      ) as FormGroup,
      component,
      name,
    };

    return this.map[componentId].formGroup;
  }

  onComponentSelected(component: Block): void {
    if (this.currentSelected === component) {
      return;
    }

    if (!this.firstSelected) {
      this.firstSelected = component;
    }

    if (this.currentSelected) {
      this.currentSelected.selected = false;
    }
    this.currentSelected = component;
    component.selected = true;
    this.selectedPropertySubject.next(this.map[component.id]);
  }

  onComponentRemoved(component: Block): void {
    const currentSelectedComponentRemoved = this.removeComponent(component);
    if (currentSelectedComponentRemoved) {
      this.onComponentSelected(this.firstSelected as Block);
    }
  }

  private removeComponent<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >(component: Block): boolean {
    let currentSelectedComponentRemoved = component === this.currentSelected;

    delete this.map[component.id];
    const asContainer = component as ContainerBlock<TBuildingBlock>;

    if (asContainer?.container?.children.length > 0) {
      asContainer.container.children.forEach((c) => {
        currentSelectedComponentRemoved =
          currentSelectedComponentRemoved || this.removeComponent(c);
      });
    }

    return currentSelectedComponentRemoved;
  }

  getComponentPropertyFormGroup(componentId: string): FormGroup {
    return this.map[componentId].formGroup;
  }
}
