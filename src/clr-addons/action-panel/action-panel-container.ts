/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'clr-action-panel-container',
  template: `
    <div class="action-panel-outer-wrapper">
      <ng-content select="clr-action-panel-container-content"></ng-content>
      <ng-content select="clr-action-panel-container-footer"></ng-content>
    </div>
    <ng-content select="clr-action-panel"></ng-content>
  `,
  host: {
    '[class.content-container]': 'true',
    '[class.action-panel-container]': 'true',
  },
  standalone: false,
})
export class ClrActionPanelContainer {}
