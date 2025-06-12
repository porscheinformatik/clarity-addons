/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'clr-tt-placeholder',
  template: `
    <div class="treetable-placeholder treetable-empty">
      <div class="treetable-placeholder-image"></div>
      <ng-content></ng-content>
    </div>
  `,
  host: { '[class.treetable-placeholder-container]': 'true' },
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetablePlaceholder {}
