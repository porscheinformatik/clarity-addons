/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnDestroy, OnInit } from '@angular/core';
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
export class ClrSummaryItemValueCopyButton implements OnInit, OnDestroy {
  public value = input.required<string>();
  public tooltipText = input<string>('Copy to clipboard');
  public showCopiedIcon = false;
  protected tooltipSize = 'md';

  private readonly cdr = inject(ChangeDetectorRef);
  private resetTimeout: ReturnType<typeof setTimeout> | null = null;

  public ngOnInit(): void {
    const newSize = this.tooltipText && this.tooltipText().length < 30 ? 'sm' : 'md';

    if (this.tooltipSize !== newSize) {
      this.tooltipSize = newSize;
      this.cdr.markForCheck();
    }
  }

  public ngOnDestroy(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
      this.resetTimeout = null;
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

    // Clear any pending reset timeout to restart the timer
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
}
