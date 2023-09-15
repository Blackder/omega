import { Injectable, Type } from '@angular/core';
import { BlockComponent } from '../component-generation/block/block.component';

const htmlContainerComponents = [
  'a',
  'div',
  'fieldset',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'p',
  'span',
  'ul',
];

@Injectable()
export class ComponentResolver {
  private selfClosedElements = ['input', 'img'];

  private isHtmlContainerComponent(componentName: string): boolean {
    return htmlContainerComponents.includes(componentName);
  }

  resolve(componentName: string): {
    component: Type<any>;
    isDropContainer: boolean;
  } {
    return {
      component: BlockComponent,
      isDropContainer: !this.selfClosedElements.includes(componentName),
    };
  }
}
