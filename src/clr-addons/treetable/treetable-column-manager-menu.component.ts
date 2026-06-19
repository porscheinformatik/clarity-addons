import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import {
  ClrCommonStringsService,
  ClrPopoverHostDirective,
  ClrPopoverPosition,
  ClrPopoverService,
  ClrPopoverType,
} from '@clr/angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';

let id = 0;

@Component({
  selector: 'clr-tt-column-manager-menu',
  template: `
    <button
      role="button"
      type="button"
      class="btn btn-sm column-manager-menu-open"
      clrPopoverOrigin
      clrPopoverOpenCloseButton
      [attr.aria-controls]="popoverId"
      [attr.aria-expanded]="open()"
      [attr.aria-haspopup]="'menu'"
    >
      {{ commonStrings.pickColumns }}
    </button>
    <div
      class="column-switch"
      role="dialog"
      [attr.aria-label]="commonStrings.showColumnsMenuDescription"
      [id]="popoverId"
      cdkTrapFocus
      cdkTrapFocusAutoCapture
      *clrPopoverContent="
        open();
        at: popoverPosition;
        type: popoverType;
        outsideClickToClose: true;
        scrollToClose: true
      "
    >
      <div class="switch-header">
        <div class="clr-sr-only" tabindex="-1" #allSelected>{{ commonStrings.allColumnsSelected }}</div>
        <h2>{{ commonStrings.showColumns }}</h2>
        <button
          class="btn btn-sm btn-link-neutral toggle-switch-close-button"
          clrPopoverCloseButton
          type="button"
          [attr.aria-label]="commonStrings.close"
        >
          <cds-icon shape="window-close" aria-hidden="true" [attr.title]="commonStrings.close"></cds-icon>
          <span class="clr-sr-only">{{ commonStrings.close }}</span>
        </button>
      </div>
      <ul class="switch-content list-unstyled">
        @for (column of hideableColumns(); track column.id) {
        <li>
          <clr-checkbox-wrapper>
            <input
              clrCheckbox
              type="checkbox"
              [disabled]="hasOnlyOneVisibleColumn() && !column.hidden"
              [ngModel]="!column.hidden"
              (ngModelChange)="toggleColumnState(column.id, !$event)"
            />
            <label>
              <ng-template [ngTemplateOutlet]="column.titleTemplateRef"></ng-template>
            </label>
          </clr-checkbox-wrapper>
        </li>
        }
      </ul>
      <div class="switch-footer">
        <button
          type="button"
          class="btn btn-sm btn-link switch-button"
          [disabled]="areAllColumnsVisible()"
          (click)="selectAll()"
        >
          {{ commonStrings.selectAll }}
        </button>
        <button type="button" class="btn btn-sm btn-link switch-button" (click)="resetAllToInitial()">
          {{ commonStrings.neutral }}
        </button>
      </div>
    </div>
  `,
  host: {
    '[class.column-manager-menu]': 'true',
    '[class.active]': 'open()',
  },
  hostDirectives: [ClrPopoverHostDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumnManagerMenuComponent {
  protected readonly popoverId = `clr-column-manager-menu-id-${id++}`;

  private readonly _commonStringsService = inject(ClrCommonStringsService);
  private readonly _popoverService = inject(ClrPopoverService);
  private readonly _columnService = inject(TreetableColumnStateService);

  // Template constants
  protected readonly popoverPosition = ClrPopoverPosition.TOP_LEFT;
  protected readonly popoverType = ClrPopoverType.DROPDOWN;
  protected readonly commonStrings = this._commonStringsService.keys;

  protected readonly open = toSignal<boolean>(this._popoverService.openChange);
  protected readonly hideableColumns = this._columnService.hideableColumns;
  protected readonly hasOnlyOneVisibleColumn = computed(
    () =>
      this._columnService.visibleColumns()?.length === 0 &&
      this._columnService.hideableColumns().filter(column => !column.hidden)?.length === 1
  );
  protected readonly areAllColumnsVisible = computed(
    () => this._columnService.visibleColumns()?.length === this._columnService.columns()?.length
  );

  constructor() {
    effect(() => {
      console.log('Hideable columns:', this.hideableColumns());
      console.log('Has only one visible column:', this.hasOnlyOneVisibleColumn());
      console.log('Popover open:', this.open());
    });
  }

  protected toggleColumnState(id: string, value: boolean) {
    console.log(`Toggling column with id ${id} to ${value ? 'visible' : 'hidden'}`);
    this._columnService.toggleHidden(id);
  }

  protected selectAll() {
    console.log(`Showing all columns`);
    if (!this.areAllColumnsVisible()) {
      this._columnService.displayAllColumns();
    }
  }

  protected resetAllToInitial() {
    console.log(`Resetting hideable columns`);
    this._columnService.resetToInitialHidden();
  }
}
