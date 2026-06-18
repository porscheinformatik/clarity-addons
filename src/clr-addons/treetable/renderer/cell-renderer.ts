/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { HIDDEN_COLUMN_CSS_CLASS } from '../constants';

@Directive({
  selector: 'clr-tt-cell',
  standalone: false,
})
export class TreetableCellRenderer {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  public setColumnClasses(columnClasses: string[]): void {
    columnClasses.forEach((className: string) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });
  }

  public hide(): void {
    this.renderer.addClass(this.elementRef.nativeElement, HIDDEN_COLUMN_CSS_CLASS);
  }

  public show(): void {
    const element: HTMLElement = this.elementRef.nativeElement;
    if (element.classList.contains(HIDDEN_COLUMN_CSS_CLASS)) {
      this.renderer.removeClass(element, HIDDEN_COLUMN_CSS_CLASS);
    }
  }

  public setMaxWidth(maxWidth: number): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', maxWidth + 'px');
  }
}
