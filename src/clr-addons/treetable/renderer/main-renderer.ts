/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterViewChecked,
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ClrTreetableColumn } from '../treetable-column';
import { TreetableRenderStep } from './render-step.enum';

import { TreetableHeaderRenderer } from './header-renderer';
import { TreetableRenderOrganizer } from './render-organizer';
import { TableSizeService } from './table-size.service';

@Directive({
  selector: 'clr-treetable',
})
export class TreetableMainRenderer<T = any> implements AfterViewInit, AfterViewChecked, OnDestroy {
  constructor(
    private organizer: TreetableRenderOrganizer,
    private el: ElementRef,
    private tableSizeService: TableSizeService
  ) {
    this.subscriptions.push(
      this.organizer
        .filterRenderSteps(TreetableRenderStep.COMPUTE_COLUMN_WIDTHS)
        .subscribe(() => this.computeHeadersWidth())
    );
  }

  @ContentChildren(TreetableHeaderRenderer) public headers: QueryList<TreetableHeaderRenderer>;
  @ContentChildren(ClrTreetableColumn) public columns: QueryList<ClrTreetableColumn>;

  ngAfterContentInit() {
    this.subscriptions.push(
      this.headers.changes.subscribe(() => {
        this.organizer.resize();
      })
    );
  }
  private subscriptions: Subscription[] = [];

  // Initialize and set Table width for horizontal scrolling here.
  ngAfterViewInit() {
    this.tableSizeService.table = this.el;
  }

  private shouldStabilizeColumns = true;
  ngAfterViewChecked() {
    if (this.shouldStabilizeColumns) {
      setTimeout(() => this.organizer.resize(), 500);
      this.shouldStabilizeColumns = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Makes each header compute its width.
   */
  private computeHeadersWidth() {
    this.headers.forEach((header, index) => {
      this.organizer.widths[index] = header.computeWidth();
    });
    this.organizer.widths[this.organizer.widths.length - 1] -= 2;

    this.headers.forEach((header, index) => header.setWidth(this.organizer.widths[index]));
  }
}
