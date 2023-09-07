import {
  AngularBuildingBlockProperty,
  AngularComponentProperty,
} from './angular-component.property';
import { ComponentProperty } from './component.property';

export class ComponentPropertyFactory {
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
  >(framework: string): ComponentProperty<TBuildingBlock> {
    if (framework === 'angular') {
      return new AngularBuildingBlockProperty();
    }
    throw new Error(`${framework} is not supported.`);
  }
}
