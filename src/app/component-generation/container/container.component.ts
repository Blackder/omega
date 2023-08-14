import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { insertComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from './container-host.directive';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContainerComponent {
  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;
  @Input() data!: any;

  constructor(private componentResolver: ComponentResolver) {}

  onDropped(event: DndDropEvent): void {
    insertComponent(
      this.containerHost.viewContainerRef,
      this.componentResolver,
      event.data,
      event.data
    );
  }
}
