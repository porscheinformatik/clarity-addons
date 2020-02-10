/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'clr-paged-search-result-list',
  templateUrl: './paged-search-result-list.html',
})
export class ClrPagedSearchResultList {
  /**
   * The page size, used for pagination.
   */
  @Input('clrPageSize') pageSize: number;

  /**
   * The current page, used for pagination.
   */
  @Input('clrPage') currentPage: number;

  /**
   * Number of total items, used for pagination.
   */
  @Input('clrTotalItems') totalItems: number;

  /**
   * The array of items to be displayed.
   */
  @Input('clrItems') items: Array<any>;

  /**
   * The template how each item should be displayed.
   */
  @Input('clrItemTemplate')
  itemTemplateInput: TemplateRef<any>;

  @ContentChild(TemplateRef, { static: true })
  itemTemplateContent: TemplateRef<any>;

  /**
   * The position of the pager
   */
  @Input('clrPagerPosition') clrPagerPosition: string = 'bottom';

  /**
   * Triggered whenever a page change occurs.
   */
  @Output('clrPageChange') pageChange: EventEmitter<any> = new EventEmitter();

  get itemTemplate(): TemplateRef<any> {
    return this.itemTemplateInput || this.itemTemplateContent;
  }
}
