import { Component, ViewChild } from '@angular/core';
import { dropComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from '../container/container-host.directive';
import { DropData } from 'src/app/directives/drag-drop/drop-zone.directive';

@Component({
  selector: 'app-component-generation-panel',
  templateUrl: './component-generation-panel.component.html',
  styleUrls: ['./component-generation-panel.component.scss'],
})
export class ComponentGenerationPanelComponent {
  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;
  constructor(private componentResolver: ComponentResolver) {}

  onComponentDropped(dropData: DropData): void {
    dropComponent(
      dropData,
      this.containerHost.viewContainerRef,
      this.componentResolver
    );
  }
}
