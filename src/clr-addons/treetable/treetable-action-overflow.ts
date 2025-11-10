/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, Component, input, NgZone } from '@angular/core';
import {
  ClrAlignment,
  ClrAxis,
  ClrPopoverEventsService,
  ClrPopoverPosition,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
  ClrSide,
} from '@clr/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'clr-tt-action-overflow',
  providers: [ClrPopoverToggleService, ClrPopoverEventsService, ClrPopoverPositionService],
  template: `
    @if (!empty()) {
    <ng-container>
      <button class="treetable-action-trigger" clrPopoverAnchor clrPopoverOpenCloseButton>
        <cds-icon shape="ellipsis-vertical"></cds-icon>
      </button>
      <div
        class="datagrid-action-overflow"
        clrFocusTrap
        (click)="closeOverflowContent($event)"
        *clrPopoverContent="false; at: smartPosition; outsideClickToClose: true; scrollToClose: true"
      >
        <ng-content></ng-content>
      </div>
    </ng-container>
    }
  `,
  host: {
    '[class.treetable-row-actions]': 'true',
    '[class.treetable-cell]': 'true',
    role: 'cell',
  },
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetableActionOverflow {
  readonly empty = input(false);

  public smartPosition: ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  };

  constructor(private smartToggleService: ClrPopoverToggleService, private zone: NgZone) {
    this.smartToggleService.openChange.pipe(takeUntilDestroyed()).subscribe(openState => {
      if (openState) {
        this.focusFirstButton();
      }
    });
  }

  private focusFirstButton(): void {
    this.zone.runOutsideAngular(() =>
      setTimeout(() => {
        const firstButton: HTMLButtonElement | null = document.querySelector('button.action-item');
        if (firstButton) {
          firstButton.focus();
        }
      })
    );
  }

  closeOverflowContent(event: Event): void {
    this.smartToggleService.toggleWithEvent(event);
  }
}
