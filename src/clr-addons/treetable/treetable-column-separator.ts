import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  Renderer2,
  viewChild,
} from '@angular/core';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';
import { KEYBOARD_RESIZE_LENGTH, MIN_COLUMN_WIDTH } from './constants';

@Component({
  selector: 'clr-tt-column-separator',
  template: `
    <button type="button" class="treetable-column-handle" aria-label="Resize column" #columnHandle></button>
    <div class="treetable-column-resize-tracker" #resizeTracker></div>
  `,
  host: {
    '[class.treetable-column-separator]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumnSeparator implements AfterViewInit, OnDestroy {
  readonly columnId = input.required<string>();

  private readonly _columnState = inject(TreetableColumnStateService);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);
  private readonly _el = inject(ElementRef);

  private readonly _resizeTracker = viewChild.required<ElementRef>('resizeTracker');
  private readonly _columnHandle = viewChild.required<ElementRef>('columnHandle');

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

    const onMove = (e: PointerEvent) => {
      this._calculateResize(e.clientX - event.clientX);
      this._moveTracker();
    };

    const onUp = () => {
      handleEl.releasePointerCapture(event.pointerId);
      this._hideTracker();
      this._endResize();
      this._renderer.listen(handleEl, 'pointermove', () => {})(); // noop to keep TS happy
      unlisten();
    };

    const unlistenMove = this._renderer.listen(handleEl, 'pointermove', onMove);
    const unlistenUp = this._renderer.listen(handleEl, 'pointerup', onUp);
    const unlistenCancel = this._renderer.listen(handleEl, 'pointercancel', onUp);

    const unlisten = () => {
      unlistenMove();
      unlistenUp();
      unlistenCancel();
    };
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
    this._widthBeforeResize = columnEl ? columnEl.getBoundingClientRect().width : 0;
  }

  private _calculateResize(movedBy: number): void {
    const maxShrink = this._widthBeforeResize - MIN_COLUMN_WIDTH;
    if (movedBy < -maxShrink) {
      this._resizedBy = -maxShrink;
      this._isWithinMaxResizeRange = false;
    } else {
      this._resizedBy = movedBy;
      this._isWithinMaxResizeRange = true;
    }
  }

  private _endResize(): void {
    const newWidth = this._widthBeforeResize + this._resizedBy;
    if (newWidth > 0) {
      this._ngZone.run(() => {
        this._columnState.changeWidth(this.columnId(), newWidth);
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
}
