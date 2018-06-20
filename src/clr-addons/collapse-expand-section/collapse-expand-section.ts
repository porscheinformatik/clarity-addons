/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clr-collapse-expand-section',
  templateUrl: './collapse-expand-section.html',
  styleUrls: ['./collapse-expand-section.scss'],
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
