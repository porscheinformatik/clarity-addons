/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  effect,
  HostListener,
  inject,
  input,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrSummaryItem } from '../summary-item/summary-item';
import { ClarityModule } from '@clr/angular';
import { ClrSummaryAreaStateService } from './summary-area-state.service';
import {
  ClrSummaryAreaColumns,
  ClrSummaryAreaRows,
  ClrSummaryAreaError,
  ClrSummaryAreaWarning,
  ClrSummaryAreaLoading,
} from './summary-area.model';

@Component({
  selector: 'clr-summary-area',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './summary-area.html',
  styleUrl: './summary-area.scss',
})
export class ClrSummaryArea implements AfterViewInit {
  @ContentChildren(ClrSummaryItem, { descendants: true }) items!: QueryList<ClrSummaryItem>;

  public readonly isCollapsed;
  public rows = input<ClrSummaryAreaRows>(3);
  clrClickableRows = input(true);
  public currentColumns: ClrSummaryAreaColumns = 5;
  public currentRows: ClrSummaryAreaRows = this.rows();

  public error = input<ClrSummaryAreaError | undefined>();
  public warning = input<ClrSummaryAreaWarning | undefined>();
  public loading = input<ClrSummaryAreaLoading | undefined>();

  private readonly state = inject(ClrSummaryAreaStateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly defaultLoadingText = 'Loading...';
  private readonly defaultErrorText = 'Error';
  private readonly defaultWarningText = 'Warning';
  private readonly maxColumns: ClrSummaryAreaColumns = 5;

  constructor() {
    this.isCollapsed = this.state.collapsed;
    effect(() => {
      if (!this.isCollapsed()) {
        this.updateGrid();
        requestAnimationFrame(() => this.updateGrid());
      }
    });
  }

  /**
   * Depending on the current rows input only a specific amount of items can be visible to the user.
   * The summary area only supports up to 5 columns.
   * For 1 row, 5 items are visible, for 2 rows 10 items, and for 3 rows 15 items.
   * Any items beyond that will not be shown.
   * This logic is for meeting the requirement that it remains a summary area and does not grow indefinitely.
   */
  public get visibleItems(): ClrSummaryItem[] {
    const maxItems = this.maxColumns * this.rows();
    return this.items ? this.items.toArray().slice(0, maxItems) : [];
  }

  public get hasLoading(): boolean {
    return !!this.loading() && this.loading().active;
  }

  public get loadingText(): string {
    return this.loading()?.text || this.defaultLoadingText;
  }

  public get hasError(): boolean {
    return !this.hasLoading && !!this.error() && this.error().active;
  }

  public get errorText(): string {
    return this.error()?.text || this.defaultErrorText;
  }

  public get errorLinkText(): string | undefined {
    return this.error()?.linkText || undefined;
  }

  public get errorClick(): (() => void) | undefined {
    return this.error()?.click;
  }

  public get hasWarning(): boolean {
    return !this.hasLoading && !this.hasError && !!this.warning() && this.warning().active;
  }

  public get warningText(): string {
    return this.warning()?.text || this.defaultWarningText;
  }

  public get warningLinkText(): string | undefined {
    return this.warning()?.linkText || undefined;
  }

  public get warningClick(): (() => void) | undefined {
    return this.warning()?.click;
  }

  @HostListener('window:resize')
  public onResize(): void {
    if (!this.isCollapsed()) {
      this.updateGrid();
    }
  }

  public ngAfterViewInit(): void {
    this.updateGrid();
    this.cdr.detectChanges();
  }

  private updateGrid(): void {
    if (this.items && this.items.length > 0) {
      const maxItems = this.maxColumns * this.rows();
      const itemCount = Math.min(this.items.length, maxItems);
      const minRows = this.rows();
      // Use window.innerWidth as the summary-area may have negative margins extending beyond viewport
      // Subtract some padding for the content area (approx 2rem = 32px on each side)
      const containerWidth = window.innerWidth - 64;
      const minColWidth = 320 + 36; // px per column + gap between columns

      // Calculate the minimum columns needed to satisfy the row and column constraint (never more than 5 columns)
      const neededColumns = Math.min(Math.ceil(itemCount / minRows), this.maxColumns);
      // Calculate the maximum columns that fit the screen
      const maxColumnsByWidth = Math.max(1, Math.floor(containerWidth / minColWidth));

      // If enough space, use as many columns as needed for the row constraint
      // If not enough space, reduce columns and allow more rows per column
      this.currentColumns = Math.max(1, Math.min(neededColumns, maxColumnsByWidth)) as ClrSummaryAreaColumns;
      this.currentRows = Math.ceil(itemCount / this.currentColumns) as ClrSummaryAreaRows;
      this.cdr.detectChanges();
    }
  }
}
