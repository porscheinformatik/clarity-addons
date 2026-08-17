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
    /*
     * Only apply a default data-testid when the consumer hasn't provided one.
     * This is intentionally checked against the live DOM attribute (after the
     * consumer's own bindings have been applied) instead of using
     * HostAttributeToken, because HostAttributeToken can only see attribute
     * values that are static string literals at compile time. It cannot see
     * values set via [attr.data-testid]="expr", which is required whenever a
     * consumer needs a unique testid per cell (e.g. inside an @for loop).
     * Also, unlike a reactive host binding, this only runs once and never
     * overwrites a value the consumer has set afterwards.
     */
    const host = this._elementRef.nativeElement;
    if (!host.hasAttribute('data-testid')) {
      this._renderer.setAttribute(host, 'data-testid', DEFAULT_TEST_ID);
    }
  }
}
