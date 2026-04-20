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
  computed,
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
  selector: 'clr-copy-to-clipboard',
  imports: [CdkCopyToClipboard, NgClass, ClrIconModule, ClrTooltipModule],
  templateUrl: './copy-to-clipboard.html',
  styleUrl: './copy-to-clipboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.hidden-until-hovered]': 'hiddenUntilHovered()',
    '[class.parent-hovered]': 'parentHovered',
  },
})
export class ClrCopyToClipboard implements OnInit, AfterViewInit, OnDestroy {
  public value = input.required<string>();
  public trimmedValue = computed(() => this.value().trim());
  public tooltipText = input<string>('Copy to clipboard');
  public hiddenUntilHovered = input<boolean>(false);

  public showCopiedIcon = false;
  public parentHovered = false;
  protected tooltipSize = 'md';
  public tooltipPosition: 'bottom-right' | 'bottom-left' = 'bottom-right';

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);
  private resetTimeout: ReturnType<typeof setTimeout> | null = null;
  private resizeListener?: () => void;
  private parentEnterListener?: () => void;
  private parentLeaveListener?: () => void;

  public ngOnInit(): void {
    this.updateTooltipPosition();
  }

  public ngAfterViewInit(): void {
    this.updateTooltipPosition();

    this.resizeListener = () => this.updateTooltipPosition();
    window.addEventListener('resize', this.resizeListener);

    if (this.hiddenUntilHovered()) {
      this.setupParentHoverListeners();
    }
  }

  public ngOnDestroy(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
      this.resetTimeout = null;
    }

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }

    this.teardownParentHoverListeners();
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

  private setupParentHoverListeners(): void {
    const parent = this.elementRef.nativeElement.parentElement;
    if (!parent) {
      return;
    }

    this.parentEnterListener = () => {
      this.parentHovered = true;
      this.cdr.markForCheck();
    };

    this.parentLeaveListener = () => {
      this.parentHovered = false;
      this.cdr.markForCheck();
    };

    parent.addEventListener('mouseenter', this.parentEnterListener);
    parent.addEventListener('mouseleave', this.parentLeaveListener);
  }

  private teardownParentHoverListeners(): void {
    const parent = this.elementRef.nativeElement.parentElement;
    if (!parent) {
      return;
    }

    if (this.parentEnterListener) {
      parent.removeEventListener('mouseenter', this.parentEnterListener);
    }
    if (this.parentLeaveListener) {
      parent.removeEventListener('mouseleave', this.parentLeaveListener);
    }
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
