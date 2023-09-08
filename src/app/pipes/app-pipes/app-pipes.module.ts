import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToSingularPipe } from './to-singular.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { WordsPipe } from './words.pipe';

@NgModule({
  declarations: [ToSingularPipe, CapitalizePipe, WordsPipe],
  imports: [CommonModule],
  exports: [ToSingularPipe, CapitalizePipe, WordsPipe],
})
export class AppPipesModule {}
