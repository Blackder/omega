import { nameOf } from 'src/app/mixins/mixins';
import {
  validation,
  hidden,
  options,
  required,
  label,
  ignore,
  hiddenFromDisplayOnly,
} from '../decorators/decorators';
import { ComponentProperty } from './component.property';
import { CustomValidationErrorKey } from './component-property-form/form-error/error.constant';

export enum BindingType {
  innerText = 'innerText',
  property = 'property',
  twoWay = 'twoWay',
  event = 'event',
}

export class Attribute {
  @required()
  name: string = '';
  value: string = '';
}

export class Input {
  @required()
  name: string = '';
  @required()
  type: string = '';
}

export class Output {
  @required()
  name: string = '';
  @required()
  type: string = '';
}

@validation({
  key: CustomValidationErrorKey.bindingToTypeOrToValue,
  condition: (value) =>
    value.type === BindingType.event ||
    (value.to && value.toType) ||
    value.toValue,
  forFields: [
    nameOf<Binding>('to'),
    nameOf<Binding>('toType'),
    nameOf<Binding>('toValue'),
  ],
})
@validation({
  key: CustomValidationErrorKey.bindingFromRequired,
  condition: (value) => value.type === BindingType.innerText || value.from,
  forFields: [nameOf<Binding>('from')],
})
@validation({
  key: CustomValidationErrorKey.bindingToRequired,
  condition: (value) =>
    (value.type !== BindingType.innerText &&
      value.type !== BindingType.event) ||
    value.to,
  forFields: [nameOf<Binding>('to')],
})
@validation({
  key: CustomValidationErrorKey.bindingToTypeRequired,
  condition: (value) =>
    !value.to || value.type === BindingType.event || value.toType,
  forFields: [nameOf<Binding>('toType')],
})
export class Binding {
  @required()
  @options(Object.values(BindingType))
  type: BindingType = BindingType.property;
  from: any = '';
  to?: any = '';
  toType?: string = '';
  toValue?: any = '';
}

// Initialize with default value. For array property, initialize with one default item.
// This initilization is needed for auto form generation by reflection
export class AngularBuildingBlockProperty
  implements ComponentProperty<AngularBuildingBlockProperty>
{
  @hidden()
  name?: string;
  value?: string = '';
  attributes?: Attribute[] = [new Attribute()];
  bindings?: Binding[] = [new Binding()];

  @ignore()
  children?: AngularBuildingBlockProperty[] = [];

  constructor(name: string) {
    this.name = name;
  }

  copyFrom(value: any): void {
    this.name = value.name;
    this.value = value.value;
    this.attributes = value.attributes;
    this.bindings = value.bindings;
  }

  setChildren(children: AngularBuildingBlockProperty[]): void {
    this.children = children;
  }
}

export class AngularComponentProperty
  implements ComponentProperty<AngularBuildingBlockProperty>
{
  @required()
  componentName?: string = '';
  export?: boolean = true;
  inputs?: Input[] = [new Input()];
  outputs?: Output[] = [new Output()];
  @ignore()
  children?: AngularBuildingBlockProperty[] = [];

  copyFrom(value: any): void {
    this.componentName = value.componentName;
    this.inputs = value.inputs;
    this.outputs = value.outputs;
  }

  setChildren(children: AngularBuildingBlockProperty[]): void {
    this.children = children;
  }
}

export class AngularSelfClosedBuildingBlockProperty
  implements ComponentProperty<AngularBuildingBlockProperty>
{
  @hidden()
  name?: string;
  attributes?: Attribute[] = [new Attribute()];
  bindings?: Binding[] = [new Binding()];

  constructor(name: string) {
    this.name = name;
  }

  copyFrom(value: any): void {
    this.name = value.name;
    this.attributes = value.attributes;
    this.bindings = value.bindings;
  }

  setChildren(children: AngularBuildingBlockProperty[]): void {
    if (children.length > 0) {
      throw new Error('Self-closed elements cannot have children!');
    }
  }
}

export class AngularCustomComponentBuildingBlockProperty
  implements ComponentProperty<AngularBuildingBlockProperty>
{
  @label('Selector')
  @required()
  @hiddenFromDisplayOnly()
  name?: string = '';
  attributes?: Attribute[] = [new Attribute()];
  bindings?: Binding[] = [new Binding()];

  @ignore()
  children?: AngularBuildingBlockProperty[] = [];

  copyFrom(value: any): void {
    this.name = value.name;
    this.attributes = value.attributes;
    this.bindings = value.bindings;
  }

  setChildren(children: AngularBuildingBlockProperty[]): void {
    this.children = children;
  }
}
