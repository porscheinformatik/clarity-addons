/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2 } from '@angular/core';

const DEFAULT_TEST_ID = 'treetable-cell';

@Component({
  selector: 'clr-tt-cell',
  template: '<ng-content></ng-content>',
  host: {
    '[class.treetable-cell]': 'true',
    role: 'gridcell',
  },
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetableCell implements AfterViewInit {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    // Only set a default testid if the consumer didn't already provide one.
    const host = this._elementRef.nativeElement;
    if (!host.hasAttribute('data-testid')) {
      this._renderer.setAttribute(host, 'data-testid', DEFAULT_TEST_ID);
    }
  }
}
