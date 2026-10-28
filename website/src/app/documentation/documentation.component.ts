import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  ClarityIcons,
  ClrIcon,
  ClrVerticalNavModule,
  gridChartIcon,
  helpInfoIcon,
  libraryIcon,
  updateIcon,
  worldIcon,
} from '@clr/angular';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DocumentationNavLinksComponent } from './documentation-nav-links.component';

ClarityIcons.addIcons(helpInfoIcon, worldIcon, gridChartIcon, libraryIcon, updateIcon);

@Component({
  selector: 'documentation',
  templateUrl: 'documentation.component.html',
  host: {
    '[class.content-container]': 'true',
  },
  imports: [RouterOutlet, ClrVerticalNavModule, RouterLink, RouterLinkActive, ClrIcon, DocumentationNavLinksComponent],
})
export class DocumentationComponent {
  environment = environment;
}
