import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';
import { TreetableDataStateService } from './providers';
import { ClrCommonStringsService } from '@clr/angular';

@Component({
  selector: 'clr-tt-footer',
  template: `
    @if (hasSelectedRows()) {
    <div class="clr-form-control-disabled">
      <clr-checkbox-wrapper class="treetable-footer-select">
        <input clrCheckbox type="checkbox" checked="checked" disabled />
        <label>{{ selectedRows().length }}</label>
        <span class="clr-sr-only">{{ commonStrings.selectedRows }}</span>
      </clr-checkbox-wrapper>
    </div>
    } @if (hasHideableColumns()) {
    <clr-tt-column-manager-menu [resetLabel]="clrResetLabel()" />
    }

    <div class="treetable-footer-description">
      <ng-content />
    </div>
  `,
  host: {
    '[class.treetable-footer]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableFooter {
  private readonly _commonStringsService = inject(ClrCommonStringsService);
  private readonly _columnService = inject(TreetableColumnStateService);
  private readonly _dataService = inject(TreetableDataStateService);

  protected readonly commonStrings = this._commonStringsService.keys;

  clrResetLabel = input<string>('RESET');

  protected readonly hasHideableColumns = this._columnService.hasHideableColumns;
  protected readonly selectedRows = this._dataService.selectedNodes;
  protected readonly hasSelectedRows = computed(() => this.selectedRows()?.length > 0);
}
