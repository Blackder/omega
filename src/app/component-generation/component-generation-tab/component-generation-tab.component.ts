import { Component, Input } from '@angular/core';
import { ComponentPropertyService } from './component-property.service';

@Component({
  selector: 'app-component-generation-tab',
  templateUrl: './component-generation-tab.component.html',
  styleUrls: ['./component-generation-tab.component.scss'],
  providers: [ComponentPropertyService],
})
export class ComponentGenerationTabComponent {
  @Input() tab!: { framework: string };
}
