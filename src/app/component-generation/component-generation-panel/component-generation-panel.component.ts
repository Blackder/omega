import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { insertComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from '../container/container-host.directive';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'app-component-generation-panel',
  templateUrl: './component-generation-panel.component.html',
  styleUrls: ['./component-generation-panel.component.scss'],
})
export class ComponentGenerationPanelComponent {
  @ViewChild(ContainerHostDirective, { static: true }) containerHost!: ContainerHostDirective;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentResolver: ComponentResolver
  ) {}

  onComponentDropped(event: DndDropEvent): void {
    insertComponent(
      this.containerHost.viewContainerRef,
      this.componentResolver,
      event.data,
      event.data
    );
  }
}
