/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'clr-content-panel-container',
  template: `
    <div class="content-panel-outer-wrapper">
      <ng-content select="clr-content-panel-container-content"></ng-content>
      <ng-content select="clr-content-panel-container-footer"></ng-content>
    </div>
    <ng-content select="clr-content-panel"></ng-content>
  `,
  host: {
    '[class.content-container]': 'true',
    '[class.content-panel-container]': 'true',
  },
})
export class ClrContentPanelContainer {}
