/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnDestroy, QueryList } from '@angular/core';
import { ClrDropdown } from '@clr/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: 'clr-dropdown-menu' })
export class ClrDropdownOverflowDirective implements AfterContentInit, OnDestroy {
  @Input() clrDropdownMenuMaxHeight: string | number; // can be of px, rem, vh, or a number (which then is considered as px value)
  @Input() clrDropdownMenuItemMinHeight: string | number; // can be of px, rem, vh, or a number (which then is considered as px value)

  @ContentChildren(ClrDropdown, { descendants: true }) private nestedDropdownChildren: QueryList<ClrDropdown>;

  public readonly defaultItemMinHeightRem = 1.5;
  public readonly marginBottomRem = 0.1;

  private destroy$ = new Subject<void>();

  public constructor(private elRef: ElementRef) {}

  ngAfterContentInit(): void {
    // first trigger manually because the subscription lower only triggers after first change
    if (!this.nestedDropdownChildren?.length) {
      this.applyDropdownOverflowStyles();
    }

    this.nestedDropdownChildren.changes.pipe(takeUntil(this.destroy$)).subscribe((children: QueryList<ClrDropdown>) => {
      // if there are any nested dropdowns, our overflow fix prevents those from showing and needs to be removed
      if (!children?.length) {
        this.applyDropdownOverflowStyles();
      } else if (children?.length) {
        this.removeDropdownOverflowStyles();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyDropdownOverflowStyles(): void {
    // the vertical position of our element in the current window
    const y = this.elRef.nativeElement.getBoundingClientRect().y;

    const itemMinHeightPx = this.getItemMinHeight(this.clrDropdownMenuItemMinHeight);
    // see https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
    for (const item of this.getAllChildDropdownMenuItems()) {
      item.style.minHeight = itemMinHeightPx + 'px';
    }

    this.elRef.nativeElement.style.maxHeight =
      this.getMenuMaxHeight(
        this.clrDropdownMenuMaxHeight,
        window.innerHeight - y - this.convertRemToPixels(this.marginBottomRem)
      ) + 'px';
    this.elRef.nativeElement.style.overflowY = 'auto';
  }

  private removeDropdownOverflowStyles(): void {
    for (const item of this.getAllChildDropdownMenuItems()) {
      item.style.minHeight = null;
    }

    this.elRef.nativeElement.style.maxHeight = null;
    this.elRef.nativeElement.style.overflowY = null;
  }

  private getAllChildDropdownMenuItems() {
    return this.elRef.nativeElement.getElementsByClassName('dropdown-item');
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
