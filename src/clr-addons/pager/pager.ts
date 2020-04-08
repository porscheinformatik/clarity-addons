/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Custom pager component because clarity's pager component can only be used inside a data grid.
 * Currently a requested feature, see here: https://github.com/vmware/clarity/issues/2268
 * In this issue it is mentioned that a button group is a suitable replacement until the pager component is released.
 */
@Component({
  selector: 'clr-pager',
  templateUrl: './pager.html',
  host: { '[class.pager]': 'true' },
})
export class ClrPager {
  @Output('clrPageChange') pageChange: EventEmitter<any> = new EventEmitter(false);

  /**
   * Page size, a value of 0 means no pagination
   */
  private _pageSize = 0;
  public get pageSize(): number {
    return this._pageSize;
  }

  @Input('clrPageSize')
  public set pageSize(size: number) {
    const oldSize = this._pageSize;
    if (size !== oldSize) {
      this._pageSize = size;
      if (size === 0) {
        this._page = 1;
      } else {
        // Yeap. That's the formula to keep the first item from the old page still
        // displayed in the new one.
        this._page = Math.floor((oldSize / size) * (this._page - 1)) + 1;
      }
      // We always emit an event even if the current page index didn't change, because
      // the size changing means the items inside the page are different
      this.pageChange.emit(this._page);
    }
  }

  /**
   * Total items (needed to guess the last page)
   */
  private _totalItems = 0;
  public get totalItems(): number {
    return this._totalItems;
  }

  @Input('clrTotalItems')
  public set totalItems(total: number) {
    this._totalItems = total;
    // If we have less items than before, we might need to change the current page
    if (this.page > this.last) {
      this.page = this.last;
    }
  }

  /**
   * Last page
   */
  private _last: number;
  public get last(): number {
    if (this._last) {
      return this._last;
    }
    // If the last page isn't known, we compute it from the last item's index
    if (this.pageSize > 0 && this.totalItems) {
      return Math.ceil(this.totalItems / this.pageSize);
    }
    return 1;
  }

  @Input('clrLast')
  public set last(page: number) {
    this._last = page;
  }

  /**
   * Current page
   */
  private _page = 1;
  public get page(): number {
    return this._page;
  }

  @Input('clrPage')
  public set page(page: number) {
    if (page !== this._page) {
      this._page = page;
      this.pageChange.emit(page);
    }
  }

  /**
   * Moves to the previous page if it exists
   */
  public previous(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  /**
   * Moves to the next page if it exists
   */
  public next(): void {
    if (this.page < this.last) {
      this.page++;
    }
  }

  /**
   * Conditionally adds page numbers before and after the current page
   */
  public get middlePages(): number[] {
    const middlePages: number[] = [];
    if (this.page > 1) {
      middlePages.push(this.page - 1);
    }
    middlePages.push(this.page);
    if (this.page < this.last) {
      middlePages.push(this.page + 1);
    }
    return middlePages;
  }
}
