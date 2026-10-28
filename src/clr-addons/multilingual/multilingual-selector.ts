import { Component, EventEmitter, Input, Output } from '@angular/core';
import { angleIcon, ClarityIcons, ClrDropdownModule, ClrIcon, ClrIfOpen, ClrPopoverContent } from '@clr/angular';
import { ClrDropdownOverflowDirective } from '../dropdown/clr-dropdown-overflow.directive';
import { KeyValuePipe } from '@angular/common';

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
          data-testid="multilingual-selector-trigger"
        >
          {{ selectedLang }}
          @if (getIconShape(selectedLang); as selectedIconShape) {
            <cds-icon [shape]="selectedIconShape"></cds-icon>
          }
          <cds-icon shape="angle" direction="down"></cds-icon>
        </button>
        <clr-dropdown-menu *clrIfOpen data-testid="multilingual-selector-menu">
          @for (text of texts | keyvalue; track text) {
            @if (text.key !== selectedLang) {
              <div
                class="clr-multilingual-dd-entry"
                clrDropdownItem
                (click)="selectedLangChange.emit(text.key)"
                [attr.data-testid]="'multilingual-selector-option-' + text.key"
              >
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
  imports: [ClrDropdownModule, ClrIcon, ClrIfOpen, ClrPopoverContent, ClrDropdownOverflowDirective, KeyValuePipe],
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
