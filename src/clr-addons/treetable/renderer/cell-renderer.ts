/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: 'clr-tt-cell' })
export class TreetableCellRenderer {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public setColumnClasses(columnClasses: string[]): void {
    columnClasses.forEach((className: string) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }

  public setMaxWidth(maxWidth: number): void {
    this.renderer.setStyle(this.el.nativeElement, 'max-width', maxWidth + 'px');
  }
}
