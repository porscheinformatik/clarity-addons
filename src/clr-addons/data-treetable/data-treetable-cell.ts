/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'clr-dt-cell',
  template: '<ng-content></ng-content>',
  host: {
    '[class.data-treetable-cell]': 'true',
    role: 'cell',
  },
  standalone: false,
})
export class ClrDataTreeTableCell {}
