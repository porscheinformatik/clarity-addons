import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import {
  ClrAlignment,
  ClrAxis,
  ClrCommonStringsService,
  ClrPopoverHostDirective,
  ClrPopoverPosition,
  ClrPopoverToggleService,
  ClrSide,
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
      clrPopoverAnchor
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
      *clrPopoverContent="open(); at: smartPosition; outsideClickToClose: true; scrollToClose: true"
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
        <button type="button" class="btn btn-sm btn-link switch-button" (click)="selectAll()">
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
  },
  hostDirectives: [ClrPopoverHostDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumnManagerMenuComponent {
  protected readonly popoverId = `clr-column-manager-menu-id-${id++}`;

  private readonly _commonStringsService = inject(ClrCommonStringsService);
  private readonly _smartToggleService = inject(ClrPopoverToggleService);
  private readonly _columnService = inject(TreetableColumnStateService);

  // Smart Popover
  protected readonly smartPosition: ClrPopoverPosition = {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.START,
    content: ClrAlignment.START,
  };
  protected readonly commonStrings = this._commonStringsService.keys;

  protected readonly open = toSignal(this._smartToggleService.openChange);
  protected readonly hideableColumns = this._columnService.hideableColumns;
  protected readonly hasOnlyOneVisibleColumn = computed(
    () =>
      this._columnService.visibleColumns()?.length === 0 &&
      this._columnService.hideableColumns().filter(column => !column.hidden).length === 1
  );

  constructor() {
    effect(() => {
      console.log('Hideable columns:', this.hideableColumns());
      console.log('Has only one visible column:', this.hasOnlyOneVisibleColumn());
    });
  }

  protected toggleColumnState(id: string, value: boolean) {
    console.log(`Toggling column with id ${id} to ${value ? 'visible' : 'hidden'}`);
    this._columnService.toggleHidden(id);
  }

  protected selectAll() {}

  protected resetAllToInitial() {}
}
