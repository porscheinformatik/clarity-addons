import { Component, EventEmitter, Input, Output } from '@angular/core';

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
          <clr-icon shape="caret down"></clr-icon>
        </button>
        <clr-dropdown-menu *clrIfOpen>
          <ng-container *ngFor="let text of texts | keyvalue">
            <div
              *ngIf="text.key !== selectedLang"
              class="clr-multilingual-dd-entry"
              clrDropdownItem
              (click)="selectedLangChange.emit(text.key)"
            >
              <span class="label">{{ text.key }}</span
              >{{ text.value }}
            </div>
          </ng-container>
        </clr-dropdown-menu>
      </clr-dropdown>
    </div>
  `,
})
export class ClrMultilingualSelector {
  @Input() disabled: boolean;
  @Input() texts: Map<string, string>;
  @Input() selectedLang: string;
  @Output() selectedLangChange = new EventEmitter<string>();
}
