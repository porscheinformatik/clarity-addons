/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'clr-dot-pager',
  templateUrl: './dot-pager.html',
  host: { '[class.dot-pager]': 'true' },
})
export class ClrDotPager {
  randomId = Math.floor(Math.random() * 1000);
  @Output('clrCurrentPageChange') currentPageChange: EventEmitter<number> = new EventEmitter(false);

  /**
   * Page count, a value of 0 means no pagination
   */
  private _pages = 0;
  public get pages(): number {
    return this._pages;
  }

  @Input('clrPages')
  public set pages(pages: number) {
    this._pages = pages;
  }

  /**
   * Current page
   */
  private _currentPage = 0;
  public get currentPage(): number {
    return this._currentPage;
  }

  @Input('clrCurrentPage')
  public set currentPage(currentPage: number) {
    if (currentPage !== this._currentPage) {
      this._currentPage = currentPage;
      this.currentPageChange.emit(currentPage);
    }
  }

  pageArray(): any[] {
    return Array(this._pages);
  }
}
