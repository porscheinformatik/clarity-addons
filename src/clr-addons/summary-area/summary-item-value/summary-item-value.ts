import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private contentCheckScheduled = false;
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

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
   * This includes: a value, an icon, or projected content.
   */
  public get hasMeaningfulContent(): boolean {
    return this.hasIcon || this.hasText || this.hasProjectedContent;
  }

  /**
   * Returns true if this component should be hidden.
   * This happens when there's no meaningful content.
   */
  public get shouldHide(): boolean {
    return !this.hasMeaningfulContent;
  }

  public ngOnInit(): void {
    if (this.hasIcon && this.hasText) {
      throw new Error('SummaryItemValue: You cannot define both icon and value. Only one is allowed.');
    }
  }

  public ngAfterContentInit(): void {
    this.scheduleContentCheck();
    this.setupMutationObserver();
  }

  public ngAfterViewInit(): void {
    this.setupOverflowDetection();
    this.setupMutationObserver();
    this.scheduleContentCheck();
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
    // Use ResizeObserver to detect when the element size changes
    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        const prevOverflowing = this.isTextOverflowing;
        this.checkTextOverflowSync();
        // Only trigger change detection if overflow state changed
        if (prevOverflowing !== this.isTextOverflowing) {
          this.ngZone.run(() => {
            this.cdr.markForCheck();
          });
        }
      });

      // Observe the host element for size changes
      if (this.valueElement?.nativeElement) {
        this.resizeObserver.observe(this.valueElement.nativeElement);
      }
    });

    // Initial check
    this.checkTextOverflowSync();
  }

  private checkTextOverflowSync(): void {
    if (this.valueElement?.nativeElement) {
      const el = this.valueElement.nativeElement;
      this.isTextOverflowing = el.scrollWidth > el.clientWidth;
    }

    const tooltip = this.effectiveTooltip;
    if (tooltip && tooltip.length < 34) {
      this.tooltipSize = 'sm';
    }
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

  // private checkProjectedContent(): void {
  //   if (this.projectedContent?.nativeElement) {
  //     const wrapper = this.projectedContent.nativeElement;
  //     this.hasProjectedContent = Array.from(wrapper.childNodes).some(child => this.hasMeaningfulContentRecursive(child));
  //   } else {
  //     this.hasProjectedContent = false;
  //   }
  // }
  //
  // private hasMeaningfulContentRecursive(node: Node): boolean {
  //   if (node.nodeType === Node.TEXT_NODE) {
  //     return !!node.textContent?.trim();
  //   }
  //   if (node.nodeType === Node.ELEMENT_NODE) {
  //     return Array.from(node.childNodes).some(child => this.hasMeaningfulContentRecursive(child));
  //   }
  //   return false;
  // }

  /*private checkProjectedContent(): void {
    if (this.projectedContent?.nativeElement) {
      const wrapper = this.projectedContent.nativeElement;
      this.hasProjectedContent = Array.from(wrapper.childNodes).some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent && node.textContent.trim().length > 0;
        }
        return node.nodeType === Node.ELEMENT_NODE;
      });
    } else {
      this.hasProjectedContent = false;
    }
  }*/
}
