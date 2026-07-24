/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { ClrTreetableSelectedState } from './enums/selection-type';

@Component({
  selector: 'clr-tt-row-checkbox',
  styleUrl: './treetable-row.scss',
  template: `
    <div class="clr-checkbox-wrapper">
      <input
        type="checkbox"
        data-testId="clrTtRowCheckbox"
        [indeterminate]="isIndeterminate()"
        [checked]="isSelected()"
        (change)="toggle()"
      />
    </div>
  `,
  host: {
    '[class.treetable-row-selection]': 'true',
    '[class.treetable-cell]': 'true',
    role: 'gridcell',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableRowCheckbox {
  clrTtSelectionState = model(ClrTreetableSelectedState.UNSELECTED);

  protected isSelected = computed(() => this.clrTtSelectionState() === ClrTreetableSelectedState.SELECTED);
  protected isIndeterminate = computed(() => this.clrTtSelectionState() === ClrTreetableSelectedState.INDETERMINATE);

  protected toggle(): void {
    this.clrTtSelectionState.update(current =>
      current === ClrTreetableSelectedState.SELECTED
        ? ClrTreetableSelectedState.UNSELECTED
        : ClrTreetableSelectedState.SELECTED
    );
  }
}
