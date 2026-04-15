/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { booleanAttribute, Directive, ElementRef, inject, input, OnInit } from '@angular/core';

/**
 * Attribute directive that sets `width: fit-content !important` on a `clr-tooltip-content` element.
 *
 * Apply it to any `<clr-tooltip-content>` to prevent the tooltip from stretching to a fixed size:
 *
 * ```html
 * <!-- always fit-content -->
 * <clr-tooltip-content clrTooltipFitContent *clrIfOpen>…</clr-tooltip-content>
 *
 * <!-- conditionally fit-content -->
 * <clr-tooltip-content [clrTooltipFitContent]="isFitContent" *clrIfOpen>…</clr-tooltip-content>
 * ```
 */
@Directive({
  selector: 'clr-tooltip-content[clrTooltipFitContent]',
  standalone: true,
})
export class ClrTooltipFitContentDirective implements OnInit {
  /** When `true` (default when the attribute is present), applies `width: fit-content !important`. */
  public clrTooltipFitContent = input(true, { transform: booleanAttribute });

  private readonly el = inject(ElementRef<HTMLElement>);

  public ngOnInit(): void {
    if (this.clrTooltipFitContent()) {
      this.el.nativeElement.style.setProperty('width', 'fit-content', 'important');
    }
  }
}
