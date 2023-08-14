import { ViewContainerRef } from '@angular/core';
import { ComponentResolver } from '../services/component-resolver.service';

export function insertComponent(
  viewContainerRef: ViewContainerRef,
  componentResolver: ComponentResolver,
  componentName: string,
  data: any
): void {
  const componentRef = viewContainerRef.createComponent(
    componentResolver.resolve(componentName)
  );
  componentRef.setInput('data', data);
}
