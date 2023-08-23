import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import { dropComponent } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from './container-host.directive';
import { DropData } from 'src/app/directives/drag-drop/drop-zone.directive';
import { DragEffect } from 'src/app/directives/drag-drop/drag-drop.enum';

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
  @Input() parentContainerRef!: ViewContainerRef;
  @Input() hostView!: ViewRef;
  moveEffect = DragEffect.move;

  constructor(
    private componentResolver: ComponentResolver,
    public elementRef: ElementRef<HTMLElement>
  ) {}

  onDropped(dropData: DropData): void {
    dropComponent(
      dropData,
      this.containerHost.viewContainerRef,
      this.componentResolver
    );
  }

  remove(): void {
    this.parentContainerRef.remove(
      this.parentContainerRef.indexOf(this.hostView)
    );
  }
}
