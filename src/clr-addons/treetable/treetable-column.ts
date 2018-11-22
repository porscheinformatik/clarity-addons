/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'clr-tt-column',
  template: '<ng-content></ng-content>',
  host: {
    '[class.treetable-column]': 'true',
    role: 'columnheader',
  },
})
export class ClrTreetableColumn {}
