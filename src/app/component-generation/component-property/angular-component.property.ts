import { ignore, options, required } from '../decorators/decorators';
import { ComponentProperty } from './component.property';

export enum BindingType {
  innerText = 'innerText',
  property = 'property',
  twoWay = 'twoWay',
  event = 'event',
}

export class Attribute {
  @required()
  name: string = '';
  @required()
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

export class Binding {
  @required()
  @options(Object.values(BindingType))
  type: BindingType = BindingType.property;
  @required()
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
  @ignore()
  name?: string;
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

export class AngularComponentProperty
  implements ComponentProperty<AngularBuildingBlockProperty>
{
  @required()
  componentName?: string = '';
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
