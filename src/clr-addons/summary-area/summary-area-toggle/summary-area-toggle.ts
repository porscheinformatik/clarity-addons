/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, HostListener, computed, inject, input, output, AfterViewInit } from '@angular/core';
import { ClrIconModule, ClrTooltipModule } from '@clr/angular';

import { ClrSummaryAreaStateService, defaultSummaryAreaCollapsedKey } from '../summary-area/summary-area-state.service';
import { angleDoubleIcon, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(angleDoubleIcon);

@Component({
  selector: 'clr-summary-area-toggle',
  standalone: true,
  templateUrl: './summary-area-toggle.html',
  styleUrl: './summary-area-toggle.scss',
  imports: [ClrIconModule, ClrTooltipModule],
})
export class ClrSummaryAreaToggle implements AfterViewInit {
  public readonly summaryToggle = output<void>();
  public readonly ariaLabel = input<string>('Toggle Summary Area');
  public readonly localStorageKey = input<string>(defaultSummaryAreaCollapsedKey);

  private readonly state = inject(ClrSummaryAreaStateService);

  public readonly collapsed = computed(() => {
    return this.state.collapsed(this.localStorageKey())();
  });

  public suppressAnimation = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.suppressAnimation = false;
    });
  }

  @HostListener('keydown', ['$event'])
  public handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleToggle(event);
    }
  }

  public handleToggle(event?: Event): void {
    event?.preventDefault();
    this.state.toggle(this.localStorageKey());
    this.summaryToggle.emit();
  }
}
