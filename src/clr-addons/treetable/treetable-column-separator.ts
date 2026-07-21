import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  Renderer2,
  viewChild,
} from '@angular/core';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';
import { KEYBOARD_RESIZE_LENGTH, MIN_COLUMN_WIDTH } from './constants';
import { ClrTreetableColumn } from './treetable-column';
import { ClrCommonStringsService } from '@clr/angular';

@Component({
  selector: 'clr-tt-column-separator',
  template: `
    <button
      type="button"
      class="treetable-column-handle"
      [aria-label]="commonStrings.columnSeparatorAriaLabel"
      #columnHandle
    ></button>
    <span class="clr-sr-only">
      {{ commonStrings.columnSeparatorDescription }}
    </span>
    <div class="treetable-column-resize-tracker" #resizeTracker></div>
  `,
  host: {
    '[class.treetable-column-separator]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumnSeparator implements AfterViewInit, OnDestroy {
  private readonly _columnState = inject(TreetableColumnStateService);
  private readonly _column = inject(ClrTreetableColumn);
  private readonly _commonStringsService = inject(ClrCommonStringsService);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);
  private readonly _el = inject(ElementRef<HTMLElement>);

  private readonly _resizeTracker = viewChild.required<ElementRef<HTMLElement>>('resizeTracker');
  private readonly _columnHandle = viewChild.required<ElementRef<HTMLButtonElement>>('columnHandle');

  protected readonly commonStrings = this._commonStringsService.keys;

  private _minContentWidth = MIN_COLUMN_WIDTH;
  private _widthBeforeResize = 0;
  private _resizedBy = 0;
  private _isWithinMaxResizeRange = true;
  private _resizeStartedOnKeyDown = false;

  private readonly _unlisteners: (() => void)[] = [];

  ngAfterViewInit(): void {
    const handleEl = this._columnHandle().nativeElement;

    this._ngZone.runOutsideAngular(() => {
      this._unlisteners.push(
        this._renderer.listen(handleEl, 'pointerdown', (e: PointerEvent) => this._onPointerDown(e)),
        this._renderer.listen(handleEl, 'keydown', (e: KeyboardEvent) => {
          this._showTrackerOnFirstKeyDown(e);
          this._moveTrackerOnKeyDown(e);
        }),
        this._renderer.listen(handleEl, 'keyup', (e: KeyboardEvent) => this._hideTrackerOnKeyUp(e))
      );
    });
  }

  ngOnDestroy(): void {
    this._unlisteners.forEach(fn => fn());
  }

  // --- Pointer-based drag ---

  private _onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    const handleEl = this._columnHandle().nativeElement;
    handleEl.setPointerCapture(event.pointerId);

    this._startResize();
    this._showTracker();

    const dragUnlisteners: (() => void)[] = [];

    const onMove = (e: PointerEvent) => {
      this._calculateResize(e.clientX - event.clientX);
      this._moveTracker();
    };

    const onUp = () => {
      handleEl.releasePointerCapture(event.pointerId);
      this._hideTracker();
      this._endResize();
      dragUnlisteners.forEach(unlisten => unlisten());
    };

    dragUnlisteners.push(
      this._renderer.listen(handleEl, 'pointermove', onMove),
      this._renderer.listen(handleEl, 'pointerup', onUp),
      this._renderer.listen(handleEl, 'pointercancel', onUp)
    );
  }

  // --- Keyboard-based resize ---

  private _showTrackerOnFirstKeyDown(event: KeyboardEvent): void {
    if (!this._resizeStartedOnKeyDown && this._isArrowHorizontal(event)) {
      this._resizeStartedOnKeyDown = true;
      this._startResize();
      this._showTracker();
    }
  }

  private _moveTrackerOnKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.stopPropagation();
      this._calculateResize(this._resizedBy - KEYBOARD_RESIZE_LENGTH);
      this._moveTracker();
    } else if (event.key === 'ArrowRight') {
      event.stopPropagation();
      this._calculateResize(this._resizedBy + KEYBOARD_RESIZE_LENGTH);
      this._moveTracker();
    }
  }

  private _hideTrackerOnKeyUp(event: KeyboardEvent): void {
    if (this._resizeStartedOnKeyDown && this._isArrowHorizontal(event)) {
      this._resizeStartedOnKeyDown = false;
      this._hideTracker();
      this._endResize();
      this._columnHandle().nativeElement.focus();
    }
  }

  // --- Resize calculation ---

  private _startResize(): void {
    this._resizedBy = 0;
    this._isWithinMaxResizeRange = true;
    const columnEl = this._getColumnElement();
    this._widthBeforeResize = columnEl ? Math.round(columnEl.getBoundingClientRect().width) : 0;
    this._minContentWidth = this._measureMinContentWidth(columnEl);
  }

  private _calculateResize(movedBy: number): void {
    const maxShrink = this._widthBeforeResize - this._minContentWidth;
    if (movedBy < -maxShrink) {
      this._resizedBy = -maxShrink;
      this._isWithinMaxResizeRange = false;
    } else {
      this._resizedBy = movedBy;
      this._isWithinMaxResizeRange = true;
    }
  }

  private _endResize(): void {
    const newWidth = Math.max(this._widthBeforeResize + this._resizedBy, this._minContentWidth);
    if (newWidth != this._widthBeforeResize) {
      this._ngZone.run(() => {
        this._columnState.changeWidth(this._column.columnId, newWidth);
      });
    }
  }

  // --- Tracker visual ---

  private _showTracker(): void {
    const trackerEl = this._resizeTracker().nativeElement;
    const tableHeight = this._getTableHeight();
    this._renderer.setStyle(trackerEl, 'height', tableHeight);
    this._renderer.setStyle(trackerEl, 'display', 'block');
  }

  private _moveTracker(): void {
    const trackerEl = this._resizeTracker().nativeElement;
    this._renderer.setStyle(trackerEl, 'transform', `translateX(${this._resizedBy}px)`);

    if (this._isWithinMaxResizeRange) {
      this._renderer.removeClass(trackerEl, 'exceeded-max');
    } else {
      this._renderer.addClass(trackerEl, 'exceeded-max');
    }
  }

  private _hideTracker(): void {
    const trackerEl = this._resizeTracker().nativeElement;
    this._renderer.setStyle(trackerEl, 'display', 'none');
    this._renderer.setStyle(trackerEl, 'transform', 'translateX(0px)');
  }

  // --- DOM helpers ---

  private _getColumnElement(): HTMLElement | null {
    return this._el.nativeElement.closest('.treetable-column');
  }

  private _getTableHeight(): string {
    const grid = this._el.nativeElement.closest('.treetable-grid');
    return grid ? `${grid.clientHeight}px` : '100%';
  }

  private _isArrowHorizontal(event: KeyboardEvent): boolean {
    return event.key === 'ArrowLeft' || event.key === 'ArrowRight';
  }

  /**
   * Measures the intrinsic `min-content` width (incl. padding & border, rounded
   * to whole pixels) of the given column by temporarily forcing `width: min-content`
   * directly on the element, then restoring the previous inline value.
   *
   * `.treetable-column` already declares `min-width: min-content`; forcing the
   * `width` collapses it so `getBoundingClientRect()` reports the min-content box.
   *
   * Falls back to (and is floored at) the MIN_COLUMN_WIDTH constant.
   */
  private _measureMinContentWidth(columnEl: HTMLElement | null): number {
    if (!columnEl) {
      return MIN_COLUMN_WIDTH;
    }

    const prevWidth = columnEl.style.width;

    this._renderer.setStyle(columnEl, 'width', 'min-content');
    const measuredWidth = Math.round(columnEl.getBoundingClientRect().width);

    if (prevWidth) {
      this._renderer.setStyle(columnEl, 'width', prevWidth);
    } else {
      this._renderer.removeStyle(columnEl, 'width');
    }

    return Number.isFinite(measuredWidth) && measuredWidth > 0
      ? Math.max(measuredWidth, MIN_COLUMN_WIDTH)
      : MIN_COLUMN_WIDTH;
  }
}
