/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'clr-summary-item-value',
  standalone: true,
  imports: [CommonModule, RouterModule, ClarityModule, ClrIconModule],
  providers: [provideAnimations()],
  templateUrl: './summary-item-value.html',
  styleUrls: ['./summary-item-value.scss'],
})
export class ClrSummaryItemValue implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild('projectedContent') projectedContent?: ElementRef<HTMLSpanElement>;
  @ViewChild('valueElement') valueElement?: ElementRef<HTMLSpanElement>;

  public readonly value = input<string | undefined>();
  public readonly icon = input<string | undefined>();
  public readonly tooltip = input<string | undefined>();
  public readonly clickable = input<boolean>(false);
  public readonly clicked = output<void>();

  public hasProjectedContent = false;
  public isTextOverflowing = false;
  public tooltipSize = 'md';
  public tooltipPosition: 'bottom-right' | 'bottom-left' = 'bottom-right';

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private contentCheckScheduled = false;
  private windowResizeListener?: () => void;
  private readonly elementRef = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    // Watch for value changes and trigger overflow detection
    effect(() => {
      // Access the value signal to track changes
      const currentValue = this.value();
      if (currentValue !== undefined && currentValue !== null && currentValue !== '') {
        // Schedule overflow check after view updates
        this.scheduleOverflowCheck();
      }
    });
  }

  @HostBinding('class.has-icon')
  public get hasIcon(): boolean {
    return !!this.icon()?.trim();
  }

  @HostBinding('class.has-text')
  public get hasText(): boolean {
    return !!this.value()?.trim();
  }

  @HostBinding('class.hidden')
  public get isHidden(): boolean {
    return this.shouldHide;
  }

  public get hasClickHandler(): boolean {
    return this.clickable();
  }

  public handleClick(): void {
    if (this.clickable()) {
      this.clicked.emit();
    }
  }

  /**
   * Returns the tooltip text to display.
   * If a text overflow is detected, the full value is used as tooltip.
   * If no overflow, but a custom tooltip is provided, that is used.
   * Tooltip is undefined otherwise.
   */
  public get effectiveTooltip(): string | undefined {
    if (this.isTextOverflowing && this.hasText) {
      return this.value();
    }
    if (this.tooltip()) {
      return this.tooltip();
    }
    return undefined;
  }

  /**
   * Returns true if this component has any meaningful content to display.
   * This includes: a value or projected content.
   * An icon is considered special content and does not count as meaningful content alone.
   */
  public get hasMeaningfulContent(): boolean {
    return this.hasText || this.hasProjectedContent;
  }

  /**
   * Returns true if this component should be hidden.
   * This happens when there's no meaningful content.
   */
  public get shouldHide(): boolean {
    return !this.hasIcon && !this.hasMeaningfulContent;
  }

  public ngOnInit(): void {
    if (this.hasIcon && this.hasText) {
      throw new Error('SummaryItemValue: You cannot define both icon and value. Only one is allowed.');
    }

    this.updateTooltipPosition();
  }

  private updateTooltipPosition(): void {
    // Use double requestAnimationFrame to ensure CSS grid layout is complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = this.elementRef.nativeElement;
        const rect = element.getBoundingClientRect();

        const tooltipWidth = 200;
        const rightSpaceAvailable = window.innerWidth - rect.right;
        const newPosition = rightSpaceAvailable < tooltipWidth + 24 ? 'bottom-left' : 'bottom-right';

        if (this.tooltipPosition !== newPosition) {
          this.tooltipPosition = newPosition;
          this.cdr.markForCheck();
        }
      });
    });
  }

  public ngAfterContentInit(): void {
    this.scheduleContentCheck();
    this.setupMutationObserver();
  }

  public ngAfterViewInit(): void {
    this.setupOverflowDetection();
    this.setupMutationObserver();
    this.scheduleContentCheck();
    this.updateTooltipPosition();

    // Listen for window resize to update tooltip position when grid layout changes
    this.ngZone.runOutsideAngular(() => {
      this.windowResizeListener = () => {
        this.ngZone.run(() => {
          this.updateTooltipPosition();
        });
      };
      window.addEventListener('resize', this.windowResizeListener);
    });
  }

  public ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = undefined;
    }
    if (this.windowResizeListener) {
      window.removeEventListener('resize', this.windowResizeListener);
      this.windowResizeListener = undefined;
    }
  }

  private setupMutationObserver(): void {
    if (this.projectedContent?.nativeElement && !this.mutationObserver) {
      this.ngZone.runOutsideAngular(() => {
        this.mutationObserver = new MutationObserver(() => {
          this.scheduleContentCheck();
        });

        this.mutationObserver.observe(this.projectedContent.nativeElement, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      });
    }
  }

  private scheduleContentCheck(): void {
    if (this.contentCheckScheduled) {
      return;
    }
    this.contentCheckScheduled = true;

    queueMicrotask(() => {
      this.contentCheckScheduled = false;
      this.checkProjectedContent();
      this.ngZone.run(() => {
        this.cdr.markForCheck();
      });
    });
  }

  private setupOverflowDetection(): void {
    const el = this.valueElement?.nativeElement;
    if (!el) {
      return;
    }

    // Defer initial check to next tick to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.checkTextOverflowSync();
      this.cdr.markForCheck();
    });

    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.ngZone.run(() => {
          this.checkTextOverflowSync();
          this.updateTooltipPosition();
          this.cdr.markForCheck();
        });
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
      if (el) {
        this.resizeObserver.observe(el);
      }
    });
  }

  private checkTextOverflowSync(): void {
    if (this.valueElement?.nativeElement) {
      const el = this.valueElement.nativeElement;
      this.isTextOverflowing = el.scrollWidth > el.clientWidth;
    }

    const tooltip = this.effectiveTooltip;
    // if the tooltip content is too short for medium size, size small should be used instead
    const newSize = tooltip && tooltip.length < 30 ? 'sm' : 'md';

    if (this.tooltipSize !== newSize) {
      this.tooltipSize = newSize;
      this.cdr.markForCheck();
    }
  }

  /**
   * Schedule an overflow check after the DOM has been updated.
   * Uses setTimeout to ensure the check runs outside of change detection.
   */
  private scheduleOverflowCheck(): void {
    // Use setTimeout to ensure the check runs outside of Angular's change detection
    setTimeout(() => {
      this.checkTextOverflowSync();
      this.cdr.markForCheck();
    });
  }

  /** @internal - Manually trigger projected content check. Useful for testing. */
  public checkProjectedContent(): void {
    if (this.projectedContent?.nativeElement) {
      const wrapper = this.projectedContent.nativeElement;
      const hasText = !!wrapper.textContent?.trim();

      if (!hasText) {
        this.hasProjectedContent = false;
        return;
      }

      this.hasProjectedContent = this.hasMeaningfulContentRecursive(wrapper);
    } else {
      this.hasProjectedContent = false;
    }
  }

  private hasMeaningfulContentRecursive(node: Node): boolean {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent?.trim()) {
          return true; // Early exit on first meaningful text
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (this.hasMeaningfulContentRecursive(child)) {
          return true; // Early exit when found in subtree
        }
      }
    }
    return false;
  }
}
