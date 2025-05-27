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
                              [clrPageSizeOptions]="pageSizeOptions"
                              [clrTotalItems]="allItems.length"
                              [clrPageSizeLabel]="'Entries per page'"
                              (clrPageChange)="onPageChanged($event)"
                              (clrPageSizeChange)="onPageSizeChanged($event)">
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

const HTML_EXAMPLE = `
  <clr-action-panel-container>
    <clr-action-panel-container-content>
      <h1>Heading 1</h1>
      <p>
        Lorem ipsum <b>dolor sit amet</b>, consetetur sadipscing <i>elitr</i>, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. <br />
      </p>
    </clr-action-panel-container-content>
    <clr-action-panel>
      <ng-container clr-action-panel-title>Title2</ng-container>
      <ng-container clr-action-panel-content>
        <h1>Heading 1</h1>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h2>Heading 2</h2>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h3>Heading 3</h3>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h4>Heading 4</h4>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h5>Heading 5</h5>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      </ng-container>
    </clr-action-panel>
  </clr-action-panel-container>
`;

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './pager.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class PagerDemo extends ClarityDocComponent implements OnInit {
  dotPagerHtmlExample = DOTPAGER_HTML_EXAMPLE;
  genericPagerHtmlExample = GENERICPAGER_HTML_EXAMPLE;
  pagedSearchHtmlExample = PAGEDSEARCH_HTML_EXAMPLE;

  allItems: string[] = [];
  pagedItems: string[] = [];
  totalItems: number = 30;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 10, 20];
  currentPage: number = 1;
  pages: number = 10;

  onPageChanged(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.allItems.length - 1);

    setTimeout(() => (this.pagedItems = this.allItems.slice(startIndex, endIndex + 1)), 0);
  }

  onPageSizeChanged(pageSize: number): void {
    this.pageSize = pageSize;
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
