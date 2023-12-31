import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentGenerationService } from 'src/app/services/api/clients/componentGeneration.service';

@Component({
  selector: 'app-component-generation-screen',
  templateUrl: './component-generation-screen.component.html',
  styleUrls: ['./component-generation-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentGenerationScreenComponent {
  frameworksObservable$: Observable<string[]>;
  tabs: { framework: string }[] = [];
  selectedIndex?: number;

  constructor(
    componentGenerationService: ComponentGenerationService,
  ) {
    this.frameworksObservable$ = componentGenerationService.getFrameworks();
  }

  addNewTab(framework: string): void {
    this.tabs.push({
      framework: framework,
    });
    this.selectedIndex = this.tabs.length - 1;
  }
}
