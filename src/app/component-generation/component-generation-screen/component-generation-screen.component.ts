import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ComponentGenerationService } from 'src/app/services/api/clients/componentGeneration.service';

@Component({
  selector: 'app-component-generation-screen',
  templateUrl: './component-generation-screen.component.html',
  styleUrls: ['./component-generation-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentGenerationScreenComponent {
  formGroup: FormGroup;
  frameworksObservable$: Observable<string>;
  tabs: { framework: string }[] = [];

  constructor(
    componentGenerationService: ComponentGenerationService,
    fb: FormBuilder
  ) {
    const frameworkControl = fb.control('', [Validators.required]);
    this.formGroup = fb.group({
      framework: frameworkControl,
    });
    this.frameworksObservable$ = componentGenerationService.getFrameworks();
    this.frameworksObservable$
      .pipe(
        tap((frameworks) => {
          console.log(frameworks);
          frameworkControl.setValue(frameworks[0], { emitEvent: true });
        })
      )
      .subscribe();
  }

  addNewTab(framework: string): void {
    this.tabs.push({
      framework: this.formGroup.get('framework')?.value,
    });
  }
}
