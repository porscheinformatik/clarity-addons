/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: 'clr-dropdown-menu' })
export class ClrDropdownOverflowDirective implements AfterViewInit {
  @Input() clrDropdownMenuMaxHeight: string | number; // can be of px, rem, vh, or a number (which then is considered as px value)
  @Input() clrDropdownMenuItemMinHeight: string | number; // can be of px, rem, vh, or a number (which then is considered as px value)

  public readonly defaultItemMinHeightRem = 1.5;
  public readonly marginBottomRem = 0.1;

  public constructor(private elRef: ElementRef) {}

  public ngAfterViewInit(): void {
    this.calculateDropdownMenu();
  }

  private calculateDropdownMenu(): void {
    // the vertical position of our element in the current window
    const y = this.elRef.nativeElement.getBoundingClientRect().y;

    const itemMinHeightPx = this.getItemMinHeight(this.clrDropdownMenuItemMinHeight);
    // see https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
    for (const item of this.elRef.nativeElement.getElementsByClassName('dropdown-item')) {
      item.style.minHeight = itemMinHeightPx + 'px';
    }

    this.elRef.nativeElement.style.maxHeight =
      this.getMenuMaxHeight(
        this.clrDropdownMenuMaxHeight,
        window.innerHeight - y - this.convertRemToPixels(this.marginBottomRem)
      ) + 'px';
    this.elRef.nativeElement.style.overflowY = 'auto';
  }

  private getMenuMaxHeight(menuMaxHeightProvided: string | number, menuMaxHeightPx: number): number {
    if (menuMaxHeightProvided) {
      const maxHeightPx = this.convertToPixels(menuMaxHeightProvided);
      return maxHeightPx > menuMaxHeightPx ? menuMaxHeightPx : maxHeightPx;
    }
    return menuMaxHeightPx;
  }

  private getItemMinHeight(itemMinHeightProvided: string | number): number {
    if (itemMinHeightProvided) {
      return this.convertToPixels(itemMinHeightProvided);
    }
    return this.convertRemToPixels(this.defaultItemMinHeightRem);
  }

  private convertToPixels(value: string | number): number {
    if (typeof value === 'string') {
      if (value.endsWith('px')) {
        return parseFloat(value.replace('px', ''));
      } else if (value.endsWith('rem')) {
        return this.convertRemToPixels(parseFloat(value.replace('rem', '')));
      } else if (value.endsWith('vh')) {
        return this.convertVhToPixels(parseFloat(value.replace('vh', '')));
      }
      return parseFloat(value);
    }
    return value;
  }

  private convertRemToPixels(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  private convertVhToPixels(vh: number): number {
    const pxPerVhUnit = window.innerHeight / 100;
    return vh * pxPerVhUnit;
  }
}
