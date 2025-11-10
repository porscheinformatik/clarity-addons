import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { ClrTreetableSelectedState } from './enums/selection-type';

@Component({
  selector: 'clr-tt-row-checkbox',
  styleUrl: './treetable-row.scss',
  template: `
    <div class="clr-checkbox-wrapper treetable-row-selection treetable-cell">
      <input type="checkbox" [indeterminate]="isIndeterminate()" [checked]="isSelected()" (change)="toggle()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableRowCheckbox {
  readonly clrTtSelectionState = model(ClrTreetableSelectedState.UNSELECTED);

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
