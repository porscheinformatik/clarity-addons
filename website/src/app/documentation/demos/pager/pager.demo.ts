/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const DOTPAGER_HTML_EXAMPLE = `
<div class="card" *ngFor="let item of pagedItems">
    <div class="card-header">
        {{item}}
    </div>
    <div class="card-block">
        <div class="card-text">
            This is an example card.
        </div>
    </div>
</div>

<clr-dot-pager  [clrPages]="pages"
                [clrCurrentPage]="currentPage"
                (clrCurrentPageChange)="onPageChanged($event)">
</clr-dot-pager>
`;

const GENERICPAGER_HTML_EXAMPLE = `
<div class="clr-row" *ngFor="let item of pagedItems">
    <div class="clr-col-lg-6 clr-col-md-8 clr-col-12">
        <div class="card">
            <div class="card-header">
                {{item}}
            </div>
            <div class="card-block">
                <div class="card-text">
                    This is an example card.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="margin-top-24">
    <clr-pager [clrPage]="currentPage"
               [clrPageSize]="pageSize"
               [clrTotalItems]="totalItems"
               (clrPageChange)="onPageChanged($event)"></clr-pager>
</div>
`;

const PAGEDSEARCH_HTML_EXAMPLE = `
<clr-paged-search-result-list [clrItems]="pagedItems"
                              [clrPage]="currentPage"
                              [clrPageSize]="pageSize"
                              [clrTotalItems]="allItems.length"
                              (clrPageChange)="onPageChanged($event)">
    <ng-template let-item="item">
        <div class="col-xs-12">
            <div class="card">
                <div class="card-header">
                    {{item}}
                </div>
                <div class="card-block">
                    <div class="card-text">
                        This is an example card.
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</clr-paged-search-result-list>
`;

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './pager.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class PagerDemo extends ClarityDocComponent implements OnInit {
  dotPagerHtmlExample = DOTPAGER_HTML_EXAMPLE;
  genericPagerHtmlExample = GENERICPAGER_HTML_EXAMPLE;
  pagedSearchHtmlExample = PAGEDSEARCH_HTML_EXAMPLE;

  allItems: string[] = [];
  pagedItems: string[] = [];
  totalItems: number = 30;
  pageSize: number = 3;
  currentPage: number = 1;
  pages: number = 10;

  onPageChanged(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.allItems.length - 1);

    setTimeout(() => (this.pagedItems = this.allItems.slice(startIndex, endIndex + 1)), 0);
  }

  createItems() {
    this.allItems = [];
    for (let i = 0; i < this.totalItems; i++) {
      this.allItems[i] = 'Card ' + (i + 1);
    }
    this.pages = Math.ceil(this.totalItems / this.pageSize);
    this.onPageChanged(this.currentPage > this.pages ? this.pages : this.currentPage);
  }

  ngOnInit() {
    this.createItems();
  }

  constructor() {
    super('pager');
  }
}
