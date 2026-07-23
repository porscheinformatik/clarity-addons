/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { DEFAULT_COLUMN_CSS_CLASS, HIDDEN_COLUMN_CSS_CLASS } from '../constants';

@Directive({
  selector: 'clr-tt-column',
  standalone: false,
})
export class TreetableHeaderRenderer {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  /**
   * Returns the client width of the header cell.
   */
  public getWidth(): number {
    return this.elementRef.nativeElement.getBoundingClientRect().width;
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

  /**
   * Returns all classes starting with 'clr-col'.
   */
  public getColumnClasses(): string[] {
    const classes: string[] = [];
    this.elementRef.nativeElement.classList.forEach((className: string) => {
      if (className.includes(DEFAULT_COLUMN_CSS_CLASS)) {
        classes.push(className);
      }
    });
    return classes;
  }

  public setDefaultColumnClass(): void {
    this.renderer.addClass(this.elementRef.nativeElement, DEFAULT_COLUMN_CSS_CLASS);
  }

  public setWidth(width: number): void {
    const el = this.elementRef.nativeElement;
    this.renderer.setStyle(el, 'width', `${width}px`);
    this.renderer.setStyle(el, 'max-width', `${width}px`);
    this.renderer.setStyle(el, 'flex', '0 0 auto');
  }
}
