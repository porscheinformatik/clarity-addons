import { Component, EventEmitter, Input, Output } from '@angular/core';
import { angleIcon, ClarityIcons } from '@cds/core/icon';

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
          <cds-icon
            *ngIf="getIconShape(selectedLang) as selectedIconShape"
            class="clr-multilingual-dd-icon"
            [attr.shape]="selectedIconShape"
          ></cds-icon>
          <cds-icon shape="angle" direction="down"></cds-icon>
        </button>
        <clr-dropdown-menu *clrIfOpen data-testid="multilingual-selector-menu">
          <ng-container *ngFor="let text of texts | keyvalue">
            <ng-container *ngIf="text.key !== selectedLang">
              <div
                class="clr-multilingual-dd-entry"
                clrDropdownItem
                (click)="selectedLangChange.emit(text.key)"
                [attr.data-testid]="'multilingual-selector-option-' + text.key"
              >
                <span class="label"
                  >{{ text.key }}
                  <cds-icon
                    *ngIf="getIconShape(text.key) as iconShape"
                    class="clr-multilingual-dd-icon"
                    [attr.shape]="iconShape"
                  ></cds-icon></span
                >{{ text.value }}
              </div>
            </ng-container>
          </ng-container>
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
