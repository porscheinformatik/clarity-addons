import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ClarityIcons, gridChartIcon, helpInfoIcon, libraryIcon, worldIcon } from '@cds/core/icon';

ClarityIcons.addIcons(helpInfoIcon, worldIcon, gridChartIcon, libraryIcon);

@Component({
  selector: 'documentation',
  templateUrl: 'documentation.component.html',
  host: {
    '[class.content-container]': 'true',
  },
})
export class DocumentationComponent {
  environment = environment;
}
