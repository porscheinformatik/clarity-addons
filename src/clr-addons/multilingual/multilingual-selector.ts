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
          data-testid="multilingual-selector-trigger"
        >
          {{ selectedLang }}
          <cds-icon shape="angle" direction="down"></cds-icon>
        </button>
        <clr-dropdown-menu *clrIfOpen data-testid="multilingual-selector-menu">
          @for (text of texts | keyvalue; track text) {
            @if (text.key !== selectedLang) {
              <div
                class="clr-multilingual-dd-entry"
                clrDropdownItem
                (click)="selectedLangChange.emit(text.key)"
                data-testid="multilingual-selector-option-{{ text.key }}"
              >
                <span class="label">{{ text.key }}</span
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
  @Input() texts: Map<string, string>;
  @Input() selectedLang: string;
  @Output() selectedLangChange = new EventEmitter<string>();
}
