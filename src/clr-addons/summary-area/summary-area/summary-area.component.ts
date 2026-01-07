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
import { ClrSummaryItemComponent } from '../summary-item/summary-item.component';
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
  templateUrl: './summary-area.component.html',
  styleUrl: './summary-area.component.scss',
})
export class ClrSummaryAreaComponent implements AfterViewInit {
  @ContentChildren(ClrSummaryItemComponent, { descendants: true }) items!: QueryList<ClrSummaryItemComponent>;

  public readonly isCollapsed;
  public rows = input<ClrSummaryAreaRows>(3);
  public currentColumns: ClrSummaryAreaColumns = 5;
  public currentRows: ClrSummaryAreaRows = this.rows();

  public error = input<ClrSummaryAreaError | undefined>();
  public warning = input<ClrSummaryAreaWarning | undefined>();
  public loading = input<ClrSummaryAreaLoading | undefined>();

  private readonly state = inject(ClrSummaryAreaStateService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.isCollapsed = this.state.collapsed;
    effect(() => {
      if (!this.isCollapsed()) {
        this.updateGrid();
        requestAnimationFrame(() => this.updateGrid());
      }
    });
  }

  public get visibleItems(): ClrSummaryItemComponent[] {
    const maxItems = 5 * this.rows();
    return this.items ? this.items.toArray().slice(0, maxItems) : [];
  }

  public get hasLoading(): boolean {
    return !!this.loading() && this.loading().active;
  }

  public get loadingText(): string {
    return this.loading()?.text || 'summary.area.loading.text';
  }

  public get hasError(): boolean {
    return !this.hasLoading && !!this.error() && this.error().active;
  }

  public get errorText(): string {
    return this.error()?.text || 'summary.area.error';
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
    return this.warning()?.text || 'summary.area.warning';
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
