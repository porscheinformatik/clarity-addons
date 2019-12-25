/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from '@angular/core';
import { ClrContentPanel } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-content-panel-demo',
  templateUrl: './content-panel.demo.html',
})
export class ContentPanelDemo {
  @ViewChild(ClrContentPanel, { static: true }) clrContentPanel: ClrContentPanel;

  @ViewChild('contentPanelRight', { static: true }) clrContentPanelRight: ClrContentPanel;

  leftPanelClick(): void {
    this.clrContentPanel.toggle();
  }

  rightPanelClick(): void {
    this.clrContentPanelRight.toggle();
  }
}
