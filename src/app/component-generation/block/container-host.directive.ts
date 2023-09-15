import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appContainerHost]',
})
export class ContainerHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
