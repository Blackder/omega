import { Container } from '../mixins/mixins';
import { ComponentProperty } from './component-property/component.property';

export interface Block {
  id: string;
  selected: boolean;
}
export interface ContainerBlock<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> extends Block {
  container: Container<TBuildingBlock>;
}
