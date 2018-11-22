/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ElementRef, Inject, Injectable, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreetableRenderStep } from './render-step.enum';
import { TreetableRenderOrganizer } from './render-organizer';

/**
 * @description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
@Injectable()
export class TableSizeService implements OnDestroy {
  private _tableRef: HTMLElement;
  private columns: Element[];

  public get tableRef(): HTMLElement {
    return this._tableRef;
  }

  public set tableRef(element: HTMLElement) {
    this._tableRef = element;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    renderOrganizer: TreetableRenderOrganizer,
    private renderer: Renderer2
  ) {
    this.subscriptions.push(
      renderOrganizer.renderStep.subscribe(step => {
        if (step === TreetableRenderStep.UPDATE_ROW_WIDTH) {
          this.updateRowWidth();
        }
      })
    );
  }
  public set table(table: ElementRef) {
    if (isPlatformBrowser(this.platformId) && table.nativeElement) {
      this.tableRef = table.nativeElement.querySelector('.treetable-grid');
    }
  }

  private subscriptions: Subscription[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateRowWidth(): void {
    if (!this.tableRef) {
      return;
    }
    let newWidth: number = 0;
    this.renderer.removeStyle(this.tableRef, 'width');
    this.columns = Array.from(this.tableRef.querySelectorAll('.treetable-column'));
    const caret = this.tableRef.querySelector('.treetable-expandable-caret');
    this.columns.forEach(item => {
      newWidth += item.clientWidth;
    });
    newWidth += caret.clientWidth;
    this.renderer.setStyle(this.tableRef, 'width', newWidth - 1 + 'px');
  }
}
