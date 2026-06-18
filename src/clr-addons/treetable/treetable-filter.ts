/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, Component, computed, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ClrAlignment,
  ClrAxis,
  ClrCommonStringsService,
  ClrCommonStringsService,
  ClrPopoverPosition,
  ClrPopoverPosition,
  ClrPopoverService,
  ClrPopoverToggleService,
  ClrSide,
} from '@clr/angular';
import { ClrTreetableFilterInterface } from './interfaces/filter-model';
import { FilterStateService, RegisteredTreetableFilter } from './providers/filter-state.service';
import { Filters, RegisteredTreetableFilter } from './providers/filters';

@Component({
  selector: 'clr-tt-filter',
  template: `
    <button
      type="button"
      clrPopoverOrigin
      clrPopoverOpenCloseButton
      class="treetable-filter-toggle"
      data-testId="clrTtToggleFilterButton"
      [class.treetable-filter-open]="open()"
      [class.treetable-filtered]="active()"
      [attr.aria-expanded]="open()"
    >
      <cds-icon
        [status]="active() ? 'info' : null"
        [shape]="active() ? 'filter-grid-circle' : 'filter-grid'"
        solid
      ></cds-icon>
    </button>

    <div
      class="treetable-filter"
      role="dialog"
      cdkTrapFocus
      *clrPopoverContent="open(); at: smartPosition; outsideClickToClose: true; scrollToClose: true"
      [attr.aria-label]="commonStringsService.keys.datagridFilterDialogAriaLabel"
    >
      <div class="treetable-filter-close-wrapper">
        <button type="button" class="close" clrPopoverCloseButton>
          <cds-icon shape="window-close" [attr.aria-label]="commonStringsService.keys.close"></cds-icon>
        </button>
      </div>

      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableFilter<T extends object> implements OnInit, OnDestroy {
  protected readonly commonStringsService = inject(ClrCommonStringsService);
  private readonly smartToggleService = inject(ClrPopoverService);
  private readonly filterProvider = inject(FilterStateService<T>);

  // Smart Popover
  protected readonly smartPosition = ClrPopoverPosition.BOTTOM_LEFT;

  clrTtFilter = input.required<ClrTreetableFilterInterface<T>>();

  private readonly registered = signal<RegisteredTreetableFilter<T, ClrTreetableFilterInterface<T>>>(undefined);
  protected readonly open = toSignal(this.smartToggleService.openChange);
  protected readonly active = computed(() => this.clrTtFilter()?.isActive());

  ngOnInit() {
    this.registered.set(this.filterProvider.register(this.clrTtFilter()));
  }

  ngOnDestroy(): void {
    if (this.registered()) {
      this.registered().unregister();
    }
  }
}
