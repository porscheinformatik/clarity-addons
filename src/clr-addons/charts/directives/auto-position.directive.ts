import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ClrSignpostContent } from '@clr/angular';

type SignpostPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const PREFERRED_ORDER: SignpostPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];

@Directive({
  selector: 'clr-signpost-content[autoPosition]',
  standalone: true,
})
export class AutoPositionDirective implements OnInit, OnDestroy {
  private readonly signpostContent = inject(ClrSignpostContent, { optional: true });
  private readonly elementRef = inject(ElementRef);
  private resizeObserver?: ResizeObserver;
  private trigger?: Element;

  public ngOnInit(): void {
    const signpost = this.elementRef.nativeElement.closest('clr-signpost');
    this.trigger = signpost?.querySelector('[clrSignpostTrigger]');

    if (this.trigger) {
      this.trigger.addEventListener('mousedown', this.handleMouseDown);
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.elementRef.nativeElement.classList.contains('is-off-screen')) {
        this.updatePosition();
      }
    });
    this.resizeObserver.observe(document.body);
  }

  private readonly handleMouseDown = (): void => {
    // Only calculate when signpost is closed (about to open)
    if (this.elementRef.nativeElement.classList.contains('is-off-screen')) {
      this.updatePosition();
    }
  };

  private updatePosition(): void {
    if (!this.signpostContent || !this.trigger) {
      return;
    }

    const triggerRect = this.trigger.getBoundingClientRect();
    this.signpostContent.position = this.getBestPosition(triggerRect);
  }

  private getBestPosition(triggerRect: DOMRect): SignpostPosition {
    const contentWidth = 300;
    const contentHeight = 200;
    const buffer = 50;
    const contentHeaderHeight = document.querySelector('.content-header')?.getBoundingClientRect().height ?? 0;
    const appHeaderHight = document.querySelector('.header')?.getBoundingClientRect().height ?? 0;
    const headerHeight = contentHeaderHeight + appHeaderHight;

    // Find first position with enough space
    for (const pos of PREFERRED_ORDER) {
      if (this.hasSpace(triggerRect, pos, contentWidth, contentHeight, headerHeight, buffer)) {
        return pos;
      }
    }

    return PREFERRED_ORDER[0]; // Fallback to first preference
  }

  private hasSpace(
    rect: DOMRect,
    position: SignpostPosition,
    width: number,
    height: number,
    headerHeight: number,
    buffer: number
  ): boolean {
    const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'right'];

    const verticalSpace =
      vertical === 'top'
        ? rect.top - headerHeight - height - buffer
        : window.innerHeight - rect.bottom - height - buffer;

    const horizontalSpace =
      horizontal === 'left' ? rect.left - width - buffer : window.innerWidth - rect.right - width - buffer;

    return Math.min(verticalSpace, horizontalSpace) > 0;
  }

  public ngOnDestroy(): void {
    if (this.trigger) {
      this.trigger.removeEventListener('mousedown', this.handleMouseDown);
    }
    this.resizeObserver?.disconnect();
  }
}
