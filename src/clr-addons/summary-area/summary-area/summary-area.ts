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
//import { CommonModule } from '@angular/common';
import { ClrSummaryItem } from '../summary-item/summary-item';
//import { ClarityModule } from '@clr/angular';
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
  standalone: false,
  //imports: [CommonModule, ClarityModule],
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

  constructor() {
    this.isCollapsed = this.state.collapsed;
    effect(() => {
      if (!this.isCollapsed()) {
        this.updateGrid();
        requestAnimationFrame(() => this.updateGrid());
      }
    });
  }

  public get visibleItems(): ClrSummaryItem[] {
    const maxItems = 5 * this.rows();
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

  public toggle(): void {
    this.state.toggle();
  }

  public ngAfterViewInit(): void {
    this.updateGrid();
    this.cdr.detectChanges();
  }

  private updateGrid(): void {
    if (this.items && this.items.length > 0) {
      const maxItems = 5 * this.rows();
      const itemCount = Math.min(this.items.length, maxItems);
      const minRows = this.rows();
      // Use window.innerWidth as the summary-area may have negative margins extending beyond viewport
      // Subtract some padding for the content area (approx 2rem = 32px on each side)
      const containerWidth = window.innerWidth - 64;
      const minColWidth = 320 + 36; // px, including gap

      // Calculate the minimum columns needed to satisfy the row constraint (never more than 5)
      const neededColumns = Math.min(Math.ceil(itemCount / minRows), 5);
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
