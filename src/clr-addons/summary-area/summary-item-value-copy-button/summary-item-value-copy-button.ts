/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClrIconModule, ClrTooltipModule } from '@clr/angular';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { NgClass } from '@angular/common';
import { ClarityIcons, copyToClipboardIcon, successStandardIcon } from '@cds/core/icon';

ClarityIcons.addIcons(copyToClipboardIcon, successStandardIcon);

@Component({
  selector: 'clr-summary-area-value-copy-button',
  imports: [CdkCopyToClipboard, NgClass, ClrIconModule, ClrTooltipModule],
  templateUrl: './summary-item-value-copy-button.html',
  styleUrl: './summary-item-value-copy-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ClrSummaryItemValueCopyButton implements OnInit, AfterViewInit, OnDestroy {
  public value = input.required<string>();
  public tooltipText = input<string>('Copy to clipboard');
  public showCopiedIcon = false;
  protected tooltipSize = 'md';
  public tooltipPosition: 'bottom-right' | 'bottom-left' = 'bottom-right';

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);
  private resetTimeout: ReturnType<typeof setTimeout> | null = null;
  private resizeListener?: () => void;

  public ngOnInit(): void {
    const newSize = this.tooltipText && this.tooltipText().length < 15 ? 'sm' : 'md';

    if (this.tooltipSize !== newSize) {
      this.tooltipSize = newSize;
      this.cdr.markForCheck();
    }

    this.updateTooltipPosition();
  }

  public ngAfterViewInit(): void {
    this.updateTooltipPosition();

    this.resizeListener = () => this.updateTooltipPosition();
    window.addEventListener('resize', this.resizeListener);
  }

  public ngOnDestroy(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
      this.resetTimeout = null;
    }

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Called when the clipboard copy operation completes.
   * @param success Whether the copy was successful
   */
  public onCopied(success: boolean): void {
    if (!success) {
      return;
    }

    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }

    this.showCopiedIcon = true;
    this.cdr.markForCheck();

    this.resetTimeout = setTimeout(() => {
      this.showCopiedIcon = false;
      this.resetTimeout = null;
      this.cdr.markForCheck();
    }, 1000);
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
}
