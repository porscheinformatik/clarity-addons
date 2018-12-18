/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: 'clr-tt-column' })
export class TreetableHeaderRenderer {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * Returns the client width of the header cell.
   */
  public getWidth(): string {
    return this.el.nativeElement.clientWidth;
  }

  /**
   * Returns all classes starting with 'clr-col'.
   */
  public getColumnClasses(): string[] {
    const classes: string[] = [];
    this.el.nativeElement.classList.forEach((className: string) => {
      if (className.indexOf('clr-col') !== -1) {
        classes.push(className);
      }
    });
    return classes;
  }

  public setDefaultColumnClass(): void {
    this.renderer.addClass(this.el.nativeElement, 'clr-col');
  }
}
