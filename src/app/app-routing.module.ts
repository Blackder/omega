import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentGenerationScreenComponent } from './component-generation/component-generation-screen/component-generation-screen.component';

const routes: Routes = [
  {
    path: '**',
    component: ComponentGenerationScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
