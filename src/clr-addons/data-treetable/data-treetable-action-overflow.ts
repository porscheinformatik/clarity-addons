/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, NgZone, OnDestroy } from '@angular/core';
import {
  ClrAlignment,
  ClrAxis,
  ClrPopoverEventsService,
  ClrPopoverPosition,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
  ClrSide,
} from '@clr/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClarityIcons, ellipsisVerticalIcon } from '@cds/core/icon';

ClarityIcons.addIcons(ellipsisVerticalIcon);

@Component({
  selector: 'clr-dt-action-overflow',
  providers: [ClrPopoverToggleService, ClrPopoverEventsService, ClrPopoverPositionService],
  template: `
    <ng-container *ngIf="!empty">
      <button class="data-treetable-action-trigger" clrPopoverAnchor clrPopoverOpenCloseButton>
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
  `,
  host: {
    '[class.data-treetable-row-actions]': 'true',
    '[class.data-treetable-cell]': 'true',
    role: 'cell',
  },
  standalone: false,
})
export class ClrDataTreeTableActionOverflow implements OnDestroy {
  @Input() empty = false;

  public smartPosition: ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  };

  destroyed$ = new Subject<void>();

  constructor(private smartToggleService: ClrPopoverToggleService, private zone: NgZone) {
    this.smartToggleService.openChange.pipe(takeUntil(this.destroyed$.asObservable())).subscribe(openState => {
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
