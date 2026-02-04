/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { ClrPopoverToggleService } from '@clr/angular';
/**
 * Directive to add a delay before showing a Clarity tooltip.
 * Usage: <clr-tooltip [clrTooltipDelay]="300">
 *
 * This directive intercepts mouse events on the tooltip trigger element
 * and adds a configurable delay before opening the tooltip.
 */
@Directive({
  selector: 'clr-tooltip[clrTooltipDelay]',
  standalone: true,
})
export class ClrTooltipDelayDirective implements OnInit, OnDestroy {
  clrTooltipDelay = input<number>(300); // Default 300ms delay

  private showTimeout?: number;
  private hideTimeout?: number;
  private toggleService = inject(ClrPopoverToggleService, { optional: true });
  private elementRef = inject(ElementRef<HTMLElement>);
  private triggerElement?: HTMLElement;
  private boundMouseEnter = this.onMouseEnter.bind(this);
  private boundMouseLeave = this.onMouseLeave.bind(this);

  public ngOnInit(): void {
    if (!this.toggleService) {
      console.warn('ClrTooltipDelayDirective: ClrPopoverToggleService not found.');
      return;
    }

    // Find the trigger element with clrTooltipTrigger directive
    const host = this.elementRef.nativeElement;
    this.triggerElement = host.querySelector('[clrTooltipTrigger]') as HTMLElement;

    if (!this.triggerElement) {
      console.warn('ClrTooltipDelayDirective: Could not find element with clrTooltipTrigger.');
      return;
    }
    // Add our event listeners with capture phase to intercept before Clarity's handlers
    this.triggerElement.addEventListener('mouseenter', this.boundMouseEnter, true);
    this.triggerElement.addEventListener('mouseleave', this.boundMouseLeave, true);
  }

  public ngOnDestroy(): void {
    this.clearShowTimeout();
    this.clearHideTimeout();
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('mouseenter', this.boundMouseEnter, true);
      this.triggerElement.removeEventListener('mouseleave', this.boundMouseLeave, true);
    }
  }

  private onMouseEnter(event: MouseEvent): void {
    // Stop the event from reaching Clarity's handlers
    event.stopImmediatePropagation();
    this.clearHideTimeout();
    this.clearShowTimeout();
    // Schedule the tooltip to open after delay
    this.showTimeout = window.setTimeout(() => {
      if (this.toggleService) {
        this.toggleService.open = true;
      }
    }, this.clrTooltipDelay());
  }

  private onMouseLeave(event: MouseEvent): void {
    // Stop the event from reaching Clarity's handlers
    event.stopImmediatePropagation();
    this.clearShowTimeout();
    // Close the tooltip immediately
    if (this.toggleService) {
      this.toggleService.open = false;
    }
  }

  private clearShowTimeout(): void {
    if (this.showTimeout !== undefined) {
      window.clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout !== undefined) {
      window.clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }
}
