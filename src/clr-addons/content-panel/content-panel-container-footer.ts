/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'clr-content-panel-container-footer',
  template: ` <ng-content></ng-content> `,
  host: {
    '[class.content-area-footer]': 'true',
  },
  standalone: false,
})
export class ClrContentPanelContainerFooter {}
