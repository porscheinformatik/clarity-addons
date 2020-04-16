/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'clr-content-panel-container-content',
  template: ` <ng-content></ng-content> `,
  host: {
    '[class.content-area]': 'true',
  },
})
export class ClrContentPanelContainerContent {}
