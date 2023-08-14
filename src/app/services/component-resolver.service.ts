import { Injectable } from '@angular/core';
import { ContainerComponent } from '../component-generation/container/container.component';

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
  private isHtmlContainerComponent(componentName: string): boolean {
    return htmlContainerComponents.includes(componentName);
  }

  resolve(componentName: string): any {
    return ContainerComponent;
  }
}
