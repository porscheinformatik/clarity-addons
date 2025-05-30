/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { angleIcon, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-collapse-expand-section',
  templateUrl: './collapse-expand-section.html',
  animations: [
    trigger('collapseExpandAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0, overflow: 'hidden' }),
        animate('300ms', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('300ms', style({ opacity: 0, height: 0 })),
      ]),
    ]),
    trigger('rotateIcon', [
      state('true', style({ transform: 'rotate(0)' })),
      state('false', style({ transform: 'rotate(180deg)' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in')),
    ]),
  ],
  standalone: false,
})
export class ClrCollapseExpandSection implements AfterViewInit {
  @Input('clrIsCollapsed') isCollapsed = true;
  @Input('clrDisableHeaderStyles') disableHeaderStyles = false;

  // there is no suitable option to detect, if the the subtitle is available or not
  // see https://github.com/angular/angular/issues/26083
  @Input('clrDisableSubtitle') disableSubtitle = false;

  @Output('clrCollapsed') collapsed = new EventEmitter();
  @Output('clrExpanded') expanded = new EventEmitter();

  public disableAnimation = true;

  ngAfterViewInit() {
    // do not animate before first change detection cycle
    setTimeout(() => {
      this.disableAnimation = false;
    }, 0);
  }

  onCollapseExpand(): void {
    if (this.isCollapsed) {
      this.expanded.emit();
    } else {
      this.collapsed.emit();
    }

    this.isCollapsed = !this.isCollapsed;
  }
}
