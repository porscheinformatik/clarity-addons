/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChildren,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
  QueryList,
  Signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrSummaryItem } from '../summary-item/summary-item';
import { ClarityModule } from '@clr/angular';
import { ClrSummaryAreaStateService, defaultSummaryAreaCollapsedKey } from './summary-area-state.service';
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
export class ClrSummaryArea implements OnInit, AfterViewInit, OnDestroy {
  @ContentChildren(ClrSummaryItem, { descendants: true }) items!: QueryList<ClrSummaryItem>;
  @ViewChild('panelsRef', { static: true }) panelsRef!: ElementRef<HTMLElement>;

  public isCollapsed: Signal<boolean>;
  public rows = input<ClrSummaryAreaRows>(3);
  public localStorageKey = input<string>(defaultSummaryAreaCollapsedKey);
  public error = input<ClrSummaryAreaError | undefined>();
  public warning = input<ClrSummaryAreaWarning | undefined>();
  public loading = input<ClrSummaryAreaLoading | undefined>();

  public currentColumns: ClrSummaryAreaColumns = 5;
  public currentRows: ClrSummaryAreaRows = this.rows();
  public noTransition = false;
  public panelHeight: string = '0px';

  private prevLoading = false;
  private prevErrorActive = false;
  private prevWarningActive = false;
  private prevCollapsed = true;
  private noTransitionTimeout: any;

  private readonly state = inject(ClrSummaryAreaStateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly defaultLoadingText = 'Loading...';
  private readonly defaultErrorText = 'Error';
  private readonly defaultWarningText = 'Warning';
  private readonly maxColumns: ClrSummaryAreaColumns = 5;
  private itemsSubscription?: { unsubscribe: () => void };

  public errorActive = computed(() => this.error()?.active() ?? false);
  public warningActive = computed(() => this.warning()?.active() ?? false);

  constructor() {
    // Effect to handle expand/collapse with smooth height transition
    effect(() => {
      const collapsed = this.isCollapsed();

      if (!collapsed) {
        // Expanding: update grid first, then measure and set height
        this.updateGrid();
        requestAnimationFrame(() => {
          this.updateGrid();
          this.updatePanelHeight();
        });
      } else if (!this.prevCollapsed && collapsed) {
        // Collapsing: set current height first, then animate to 0
        this.animateCollapse();
      }

      this.prevCollapsed = collapsed;
    });

    // Effect to skip animation when transitioning from loading to grid while expanded
    effect(() => {
      const loading = this.hasLoading;
      const collapsed = this.isCollapsed();
      // If loading just became false and area is NOT collapsed (expanded), skip transition
      // This prevents UI jumping when loading finishes and grid appears
      if (this.prevLoading && !loading && !collapsed) {
        this.noTransition = true;
        clearTimeout(this.noTransitionTimeout);
        this.noTransitionTimeout = setTimeout(() => {
          this.noTransition = false;
          this.cdr.markForCheck();
        }, 50);
        this.cdr.markForCheck();
      }
      // When loading state changes and not collapsed, recalculate height
      if (loading !== this.prevLoading && !collapsed) {
        setTimeout(() => {
          this.recalculatePanelHeight();
        }, 0);
      }
      this.prevLoading = loading;
    });

    // Effect for tracking changes in the error state (using computed signal)
    effect(() => {
      const errorActive = this.errorActive();
      const collapsed = this.isCollapsed();
      // If error active state changed and area is NOT collapsed, recalculate panel height
      if (errorActive !== this.prevErrorActive && !collapsed) {
        this.updateGrid();
        this.cdr.detectChanges();
        requestAnimationFrame(() => {
          this.recalculatePanelHeight();
        });
      }
      this.prevErrorActive = errorActive;
    });

    // Effect for tracking changes in the warning state (using computed signal)
    effect(() => {
      const warningActive = this.warningActive();
      const collapsed = this.isCollapsed();
      // If error active state changed and area is NOT collapsed, recalculate panel height
      if (warningActive !== this.prevWarningActive && !collapsed) {
        this.updateGrid();
        this.cdr.detectChanges();
        requestAnimationFrame(() => {
          this.recalculatePanelHeight();
        });
      }
      this.prevWarningActive = warningActive;
    });
  }

  public ngOnInit(): void {
    this.isCollapsed = this.state.collapsed(this.localStorageKey());
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
    return !this.hasLoading && !!this.error() && this.error().active();
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
    return !this.hasLoading && !this.hasError && !!this.warning() && this.warning().active();
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
      this.cdr.detectChanges();
      // Recalculate height after grid update for responsive changes
      // Use setTimeout to ensure DOM is updated with new grid layout
      setTimeout(() => {
        this.recalculatePanelHeight();
      }, 0);
    }
  }

  public ngAfterViewInit(): void {
    this.updateGrid();
    this.cdr.detectChanges();
    // Set initial height after content is rendered
    if (!this.isCollapsed()) {
      // Use setTimeout to ensure DOM is fully painted
      setTimeout(() => {
        // If loading, calculate height immediately based on rows
        if (this.hasLoading || this.hasError || this.hasWarning) {
          const calculatedHeight = this.calculateGridHeight();
          this.panelHeight = calculatedHeight + 'px';
          this.cdr.detectChanges();
        } else {
          this.recalculatePanelHeight();
        }
      }, 0);
    }

    // Subscribe to content changes (when items get dynamically added/removed)
    this.itemsSubscription = this.items.changes.subscribe(() => {
      // Force layout recalculation after DOM update
      setTimeout(() => {
        this.updateGrid();
        this.cdr.detectChanges();
        if (!this.isCollapsed()) {
          setTimeout(() => {
            this.recalculatePanelHeight();
          }, 0);
        }
      }, 0);
    });
  }

  public ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe();
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

  private updatePanelHeight(): void {
    if (this.panelsRef?.nativeElement) {
      const el = this.panelsRef.nativeElement;

      // For loading/error/warning states, use calculated height
      if (this.hasLoading || this.hasError || this.hasWarning) {
        const calculatedHeight = this.calculateGridHeight();
        // Set to 0 first for animation start
        this.panelHeight = '0px';
        this.cdr.detectChanges();
        void el.offsetHeight;
        // Animate to calculated height
        requestAnimationFrame(() => {
          this.panelHeight = calculatedHeight + 'px';
          this.cdr.markForCheck();
        });
        return;
      }

      // For grid state, measure the DOM
      // Set to 0 first for animation start
      this.panelHeight = '0px';
      this.cdr.detectChanges();
      // Force reflow
      void el.offsetHeight;
      // Temporarily set to auto to measure the full content height
      el.style.height = 'auto';
      const scrollHeight = el.scrollHeight;
      // Reset to 0 to prepare for animation
      el.style.height = '0px';
      // Force reflow again
      void el.offsetHeight;
      // Animate to measured height
      requestAnimationFrame(() => {
        this.panelHeight = scrollHeight + 'px';
        this.cdr.markForCheck();
      });
    }
  }

  private recalculatePanelHeight(): void {
    console.log('### DEBUG: recalculatePanelHeight() called');
    if (this.panelsRef?.nativeElement && !this.isCollapsed()) {
      // If specific states are active, use calculated height
      if (this.hasLoading || this.hasError || this.hasWarning) {
        const calculatedHeight = this.calculateGridHeight();
        this.panelHeight = calculatedHeight + 'px';
        this.cdr.detectChanges();
        return;
      }

      const el = this.panelsRef.nativeElement;
      // Temporarily disable transition for immediate update
      this.noTransition = true;
      // Set height to auto temporarily to measure true content height
      const currentHeight = el.style.height;
      el.style.height = 'auto';
      // Force reflow to ensure measurement is accurate
      void el.offsetHeight;
      // Measure the actual content height
      const scrollHeight = el.scrollHeight;
      // Restore height and set new value
      el.style.height = currentHeight;
      this.panelHeight = scrollHeight + 'px';
      this.cdr.detectChanges();
      // Re-enable transition after DOM update
      setTimeout(() => {
        this.noTransition = false;
        this.cdr.markForCheck();
      }, 0);
    }
  }

  /**
   * Calculate the expected grid height based on currentRows.
   * This is used when the grid isn't rendered (e.g., during loading state).
   * The loading container should match the grid height exactly.
   *
   * Grid structure:
   * - .summary-area-container: margin 0 24px 9px 24px
   * - .summary-grid: padding 3px 0, row-gap 6px
   * - .summary-item: height 20px
   *
   * Formula: (rows * itemHeight) + ((rows - 1) * rowGap) + gridPadding + containerMargin
   */
  private calculateGridHeight(): number {
    console.log('### DEBUG: calculateGridHeight() called');
    const itemHeight = 20; // .summary-item height
    const rowGap = 6; // .summary-grid row-gap
    const gridPadding = 6; // .summary-grid padding (3px top + 3px bottom)
    const containerMargin = 9; // .summary-area-container margin-bottom

    // For error/warning states, use a smaller fixed height
    if (this.hasError || this.hasWarning) {
      const alertHeight = itemHeight + 2 * rowGap;
      return alertHeight + gridPadding + containerMargin;
    }

    // For loading state, calculate based on current rows
    const gridHeight = this.currentRows * itemHeight + (this.currentRows - 1) * rowGap;
    return gridHeight + gridPadding + containerMargin;
  }

  private animateCollapse(): void {
    if (this.panelsRef?.nativeElement) {
      const el = this.panelsRef.nativeElement;
      // Set current height explicitly first
      this.panelHeight = el.scrollHeight + 'px';
      this.cdr.detectChanges();
      // Force reflow
      void el.offsetHeight;
      // Then animate to 0
      requestAnimationFrame(() => {
        this.panelHeight = '0px';
        this.cdr.markForCheck();
      });
    }
  }
}
