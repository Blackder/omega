import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ComponentGenerationService } from 'src/app/services/api/clients/componentGeneration.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent implements OnInit {
  components: string[] = [];

  constructor(private componentGenerationService: ComponentGenerationService) {}

  ngOnInit(): void {
    this.componentGenerationService
      .getComponentList('angular')
      .pipe(
        tap((components) => {
          this.components = components;
        })
      )
      .subscribe();
  }
}