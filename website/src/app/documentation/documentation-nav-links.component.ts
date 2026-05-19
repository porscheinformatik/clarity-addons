import { Component, Input } from '@angular/core';

const COMPONENTS = require('../../settings/componentlist.json');

@Component({
  selector: 'documentation-nav-links',
  template: `
    @for (component of components; track component) { @if (component.url && !component.noDemo && component.type == type)
    {
    <a clrVerticalNavLink class="nav-link" [routerLink]="component.url" routerLinkActive="active">
      {{ component.text }}
      @if (component.isNew) {
      <span class="new nav-link-tag">New!</span>
      } @if (component.isUpdated) {
      <span class="updated nav-link-tag">Updated</span>
      }
    </a>
    } }
  `,
  standalone: false,
})
export class DocumentationNavLinksComponent {
  components = COMPONENTS.list;

  @Input() type: string;
}
