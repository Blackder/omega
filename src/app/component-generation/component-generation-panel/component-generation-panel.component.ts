import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Container, dropComponent, toggleFor } from 'src/app/mixins/mixins';
import { ComponentResolver } from 'src/app/services/component-resolver.service';
import { ContainerHostDirective } from '../container/container-host.directive';
import { DropData } from 'src/app/directives/drag-drop/drop-zone.directive';
import { ComponentPropertyFactory } from '../component-property/component-property-factory.service';
import { ComponentProperty } from '../component-property/component.property';
import { ComponentPropertyService } from '../component-generation-tab/component-property.service';
import { v4 } from 'uuid';
import { Selectable } from '../selectable';
import { BuildingBlockComponent } from '../building-block.component';
import { ComponentGenerationService } from 'src/app/services/api/clients/componentGeneration.service';
import { FormGroup } from '@angular/forms';
import { Subject, tap } from 'rxjs';
import { FileDownloadService } from './file-download.service';

@Component({
  selector: 'app-component-generation-panel',
  templateUrl: './component-generation-panel.component.html',
  styleUrls: ['./component-generation-panel.component.scss'],
})
export class ComponentGenerationPanelComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> implements OnInit, AfterViewInit, Selectable
{
  @Input() framework!: string;

  @ViewChild(ContainerHostDirective, { static: true })
  containerHost!: ContainerHostDirective;

  @ViewChildren(BuildingBlockComponent<TBuildingBlock>) children!: QueryList<
    BuildingBlockComponent<TBuildingBlock>
  >;

  id!: string;
  property?: ComponentProperty<TBuildingBlock>;
  selected: boolean = true;
  formGroup!: FormGroup;
  container!: Container<TBuildingBlock>;
  private invalidSubmission = new Subject<boolean>();
  invalidSubmission$ = this.invalidSubmission.pipe(toggleFor(1000));

  constructor(
    private componentResolver: ComponentResolver,
    private componentPropertyFactory: ComponentPropertyFactory,
    private componentPropertyService: ComponentPropertyService,
    private componentGenerationService: ComponentGenerationService,
    private fileDownloadService: FileDownloadService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = v4();
    this.property = this.componentPropertyFactory.createComponentProperty(
      this.framework
    );
    this.formGroup = this.componentPropertyService.registerComponentProperty(
      this.id,
      this.property,
      this,
      'Component'
    );
    this.componentPropertyService.onComponentSelected(this.id, this);
  }

  ngAfterViewInit(): void {
    this.container = new Container(this.containerHost.viewContainerRef);
    this.changeDetectorRef.detectChanges();
  }

  onComponentDropped(dropData: DropData<TBuildingBlock>): void {
    dropComponent(
      dropData,
      this.container,
      this.componentResolver,
      this.framework
    );
  }

  select(event: Event): void {
    event.stopPropagation();
    this.componentPropertyService.onComponentSelected(this.id, this);
  }

  generate(): void {
    const formGroup =
      this.componentPropertyService.getComponentPropertyFormGroup(this.id);

    const validChildren = this.container.children.every((c) => c.valid);

    if (!formGroup.valid || !validChildren) {
      this.invalidSubmission.next(true);
      formGroup.markAllAsTouched();
      this.container.children.forEach((c) => c.formGroup.markAllAsTouched());
      throw new Error(
        'Please fix all the errors in the component property configuration before generation!'
      );
    }

    this.property?.copyFrom(formGroup.value);
    this.property?.setChildren(
      this.container.children.map((c) => c.getProperty() as TBuildingBlock)
    );
    console.log(this.property);
    this.componentGenerationService
      .generateAngularComponent(this.property as object, 'response')
      .pipe(
        tap((blob) => {
          this.fileDownloadService.download(blob);
        })
      )
      .subscribe();
  }
}
