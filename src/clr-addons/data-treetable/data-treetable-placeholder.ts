/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-td-placeholder',
  template: `
    <div class="data-treetable-placeholder data-treetable-empty">
      <div class="data-treetable-placeholder-image"></div>
      <ng-content></ng-content>
    </div>
  `,
  host: { '[class.data-treetable-placeholder-container]': 'true' },
  standalone: false,
})
export class ClrDataTreeTablePlaceholder {}
