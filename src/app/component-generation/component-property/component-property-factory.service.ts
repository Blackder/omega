import {
  AngularBuildingBlockProperty,
  AngularComponentProperty,
  AngularCustomComponentBuildingBlockProperty,
  AngularSelfClosedBuildingBlockProperty,
} from './angular-component.property';
import { ComponentProperty } from './component.property';

export class ComponentPropertyFactory {
  private selfClosedElements = ['input', 'img'];

  createComponentProperty<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >(framework: string): ComponentProperty<TBuildingBlock> {
    if (framework === 'angular') {
      return new AngularComponentProperty();
    }
    throw new Error(`${framework} is not supported.`);
  }

  createBuildingBlockProperty<
    TBuildingBlock extends ComponentProperty<TBuildingBlock>
  >(framework: string, name: string): ComponentProperty<TBuildingBlock> {
    if (framework === 'angular') {
      return this.selfClosedElements.includes(name)
        ? new AngularSelfClosedBuildingBlockProperty(name)
        : name === 'custom-component'
        ? new AngularCustomComponentBuildingBlockProperty()
        : new AngularBuildingBlockProperty(name);
    }
    throw new Error(`${framework} is not supported.`);
  }
}
