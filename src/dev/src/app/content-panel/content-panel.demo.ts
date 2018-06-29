/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from '@angular/core';
import { ClrContentPanel } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-content-panel-demo',
  styleUrls: ['./content-panel.demo.scss'],
  templateUrl: './content-panel.demo.html',
})
export class ContentPanelDemo {
  @ViewChild(ClrContentPanel) clrContentPanel: ClrContentPanel;

  @ViewChild('contentPanelRight') clrContentPanelRight: ClrContentPanel;

  leftPanelClick(): void {
    this.clrContentPanel.toggle();
  }

  rightPanelClick(): void {
    this.clrContentPanelRight.toggle();
  }
}
