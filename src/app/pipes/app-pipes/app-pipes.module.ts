import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToSingularPipe } from './to-singular.pipe';
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [ToSingularPipe, CapitalizePipe],
  imports: [CommonModule],
  exports: [ToSingularPipe, CapitalizePipe],
})
export class AppPipesModule {}
