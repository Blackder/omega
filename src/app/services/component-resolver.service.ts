import { Injectable, Type } from '@angular/core';
import { BlockComponent } from '../component-generation/block/block.component';
import { selfClosedElements } from '../constant';
import { AngularCustomComponentComponent } from '../component-generation/angular-components/angular-custom-component/angular-custom-component.component';

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
  constructor(private angularComponentResolver: AngularComponentResolver) {}

  resolve(
    framework: string,
    componentName: string
  ): {
    component: Type<any>;
    isDropContainer: boolean;
  } {
    return framework === 'angular'
      ? this.angularComponentResolver.resolve(componentName)
      : {
          component: BlockComponent,
          isDropContainer: !selfClosedElements.includes(componentName),
        };
  }
}

@Injectable()
export class AngularComponentResolver {
  resolve(componentName: string): {
    component: Type<any>;
    isDropContainer: boolean;
  } {
    return componentName === 'custom-component'
      ? {
          component: AngularCustomComponentComponent,
          isDropContainer: true,
        }
      : {
          component: BlockComponent,
          isDropContainer: !selfClosedElements.includes(componentName),
        };
  }
}
