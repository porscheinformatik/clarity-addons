/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClarityDocComponent } from '../clarity-doc';
import { Component } from '@angular/core';

@Component({
  selector: 'clr-summary-area-demo',
  templateUrl: './summary-area.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class SummaryAreaDemo extends ClarityDocComponent {
  constructor() {
    super('summary-area');
  }
}
