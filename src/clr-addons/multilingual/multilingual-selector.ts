import { Component, EventEmitter, Input, Output } from '@angular/core';
import { angleIcon, ClarityIcons } from '@clr/angular/icon';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-multilingual-selector',
  template: `
    <div>
      <clr-dropdown [clrCloseMenuOnItemClick]="true">
        <button
          type="button"
          class="btn btn-outline btn-sm clr-multilingual-button"
          clrDropdownTrigger
          [disabled]="disabled"
        >
          {{ selectedLang }}
          @if (getIconShape(selectedLang); as selectedIconShape) {
            <cds-icon [shape]="selectedIconShape"></cds-icon>
          }
          <cds-icon shape="angle" direction="down"></cds-icon>
        </button>
        <clr-dropdown-menu *clrIfOpen>
          @for (text of texts | keyvalue; track text) {
            @if (text.key !== selectedLang) {
              <div class="clr-multilingual-dd-entry" clrDropdownItem (click)="selectedLangChange.emit(text.key)">
                <span class="label"
                  >{{ text.key }}
                  @if (getIconShape(text.key); as iconShape) {
                    <cds-icon [shape]="iconShape"></cds-icon>
                  }</span
                >{{ text.value }}
              </div>
            }
          }
        </clr-dropdown-menu>
      </clr-dropdown>
    </div>
  `,
  standalone: false,
})
export class ClrMultilingualSelector {
  @Input() disabled: boolean;
  @Input() icons: Map<string, string>;
  @Input() texts: Map<string, string>;
  @Input() selectedLang: string;
  @Output() selectedLangChange = new EventEmitter<string>();

  getIconShape(lang: string): string {
    if (!this.icons || !lang) {
      return undefined;
    }
    return this.icons.get(lang) || this.icons.get(lang.toUpperCase()) || this.icons.get(lang.toLowerCase());
  }
}
