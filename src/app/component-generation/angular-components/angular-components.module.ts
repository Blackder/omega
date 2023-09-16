import { NgModule } from '@angular/core';
import { AngularCustomComponentComponent } from './angular-custom-component/angular-custom-component.component';
import { BlockModule } from '../block/block.module';

@NgModule({
  declarations: [AngularCustomComponentComponent],
  imports: [BlockModule],
  exports: [AngularCustomComponentComponent],
})
export class AngularComponentsModule {}
