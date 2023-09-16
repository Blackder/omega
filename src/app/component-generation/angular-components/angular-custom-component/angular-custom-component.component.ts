import { Component, Input, ViewChild, ViewRef } from '@angular/core';
import { BlockComponent } from '../../block/block.component';
import { ComponentProperty } from '../../component-property/component.property';
import { AngularCustomComponentBuildingBlockProperty } from '../../component-property/angular-component.property';
import { ContainerHostDirective } from '../../block/container-host.directive';
import { Container } from 'src/app/mixins/mixins';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-angular-custom-component',
  templateUrl: '../../block/block.component.html',
  styleUrls: ['../../block/block.component.scss'],
})
export class AngularCustomComponentComponent<
  TBuildingBlock extends ComponentProperty<TBuildingBlock>
> extends BlockComponent<TBuildingBlock> {
  @ViewChild(ContainerHostDirective)
  override containerHost!: ContainerHostDirective;
  @Input() override name!: any;
  @Input() override parentContainer!: Container<TBuildingBlock>;
  @Input() override hostView!: ViewRef;
  @Input() override framework!: string;
  @Input() override isDropContainer: boolean = true;

  override initializeProperty(): ComponentProperty<TBuildingBlock> {
    const property = new AngularCustomComponentBuildingBlockProperty();
    return property;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.formGroup.controls['name'].valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap((value) => {
          this.displayName = value !== '' ? value : this.name;
        })
      )
      .subscribe();
  }
}
