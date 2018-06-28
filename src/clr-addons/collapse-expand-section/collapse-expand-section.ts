/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'clr-collapse-expand-section',
  templateUrl: './collapse-expand-section.html',
  animations: [
    trigger('collapseExpandAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateY(-100%)', opacity: 0 })),
      ]),
    ]),
    trigger('rotateIcon', [
      state('true', style({ transform: 'rotate(0)' })),
      state('false', style({ transform: 'rotate(180deg)' })),
      transition('true => false', animate('200ms ease-out')),
      transition('false => true', animate('200ms ease-in')),
    ]),
  ],
})
export class ClrCollapseExpandSection implements OnInit {
  @Input('clrIsCollapsed') isCollapsed: boolean = true;

  @Output('clrCollapsed') collapsed = new EventEmitter();
  @Output('clrExpanded') expanded = new EventEmitter();

  ngOnInit() {}

  onCollapseExpand() {
    if (this.isCollapsed) {
      this.expanded.emit();
    } else {
      this.collapsed.emit();
    }

    this.isCollapsed = !this.isCollapsed;
  }
}
