import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';
//import { ClarityModule, ClrIconModule } from '@clr/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'clr-summary-item-value',
  standalone: false,
  //imports: [CommonModule, RouterModule, ClarityModule, ClrIconModule],
  providers: [provideAnimations()],
  templateUrl: './summary-item-value.component.html',
  styleUrls: ['./summary-item-value.component.scss'],
})
export class ClrSummaryItemValueComponent
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy
{
  @ViewChild('projectedContent') projectedContent?: ElementRef<HTMLSpanElement>;
  @ViewChild('valueElement') valueElement?: ElementRef<HTMLSpanElement>;

  public readonly value = input<string | undefined>();
  public readonly icon = input<string | undefined>();
  public readonly click = input<(() => void) | undefined>();
  //@Output() clickEvent = new EventEmitter<any>();
  public readonly tooltip = input<string | undefined>();
  public readonly showOnEmptyValue = input<boolean>(true);

  public hasProjectedContent = false;
  public isTextOverflowing = false;

  private resizeObserver?: ResizeObserver;
  private readonly ngZone = inject(NgZone);

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

  /**
   * Returns the tooltip text to display.
   * If a custom tooltip is configured, use that.
   * If no custom tooltip but text is overflowing (ellipsis shown), use the value as tooltip.
   */
  public get effectiveTooltip(): string | undefined {
    if (this.tooltip()) {
      return this.tooltip();
    }
    if (this.isTextOverflowing && this.hasText) {
      return this.value();
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
   * This happens when showOnEmptyValue is false and there's no meaningful content.
   */
  public get shouldHide(): boolean {
    if (this.showOnEmptyValue()) {
      return false;
    }
    // When showOnEmptyValue is false, hide if there's no meaningful content
    return !this.hasMeaningfulContent;
  }

  /**
   * Returns true if the long dash placeholder should be shown.
   * Only show when showOnEmptyValue is true AND there's no meaningful content.
   */
  public get showPlaceholder(): boolean {
    return this.showOnEmptyValue() && !this.hasMeaningfulContent;
  }

  public ngOnInit(): void {
    if (this.hasIcon && this.hasText) {
      throw new Error('SummaryItemValueComponent: You cannot define both icon and value. Only one is allowed.');
    }
  }

  public ngAfterContentInit(): void {
    this.checkProjectedContent();
  }

  public ngAfterContentChecked(): void {
    this.checkProjectedContent();
  }

  public ngAfterViewInit(): void {
    this.setupOverflowDetection();
  }

  public ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupOverflowDetection(): void {
    // Use ResizeObserver to detect when the element size changes
    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.ngZone.run(() => {
          this.checkTextOverflow();
        });
      });

      // Observe the host element for size changes
      if (this.valueElement?.nativeElement) {
        this.resizeObserver.observe(this.valueElement.nativeElement);
      }
    });

    // Initial check
    setTimeout(() => this.checkTextOverflow(), 0);
  }

  private checkTextOverflow(): void {
    if (this.valueElement?.nativeElement) {
      const el = this.valueElement.nativeElement;
      this.isTextOverflowing = el.scrollWidth > el.clientWidth;
    }
  }

  private checkProjectedContent(): void {
    if (this.projectedContent?.nativeElement) {
      const wrapper = this.projectedContent.nativeElement;
      this.hasProjectedContent = Array.from(wrapper.childNodes).some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent && node.textContent.trim().length > 0;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          return !(node as HTMLElement).classList.contains('value-placeholder');
        }
        return false;
      });
    } else {
      this.hasProjectedContent = false;
    }
  }
}
