/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from '@angular/core';
import { ClrActionPanel } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-action-panel-demo',
  templateUrl: './action-panel.demo.html',
})
export class ActionPanelDemo {
  @ViewChild(ClrActionPanel, { static: true }) clrActionPanel: ClrActionPanel;

  openActionPanel(): void {
    this.clrActionPanel.toggle();
  }
}
