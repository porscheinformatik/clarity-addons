/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input, OnDestroy, Renderer2 } from '@angular/core';

const DEFAULT_NAV_ITEM_SELECTOR = '[clrVerticalNavLink], [clrTabLink]';
const MNEMONICS_VISIBLE_CLASS = 'clr-kbd-mnemonics-visible';
const MNEMONIC_DATA_ATTR = 'data-clr-kbd-mnemonic';
const ICON_SLOT_CLASS = 'clr-kbd-icon-slot';
const MNEMONIC_BADGE_CLASS = 'clr-kbd-mnemonic-badge';
/** Selector for functional/structural icons that must not be swapped out. */
const EXCLUDED_ICON_SELECTOR = 'cds-icon.dropdown-icon, cds-icon[shape="angle"]';

/**
 * Directive that assigns sequential numeric keyboard mnemonics to navigation items
 * and enables Alt-key-based navigation.
 *
 * - Mnemonics (1, 2, 3, ...) are assigned once at view initialisation and never change.
 * - While Alt is held the CSS class `clr-kbd-mnemonics-visible` is added to the host,
 *   causing numbered badges to appear on each item (styled via keyboard-nav.scss).
 * - Digit keys pressed while Alt is held accumulate into a buffer.
 * - When Alt is released the buffer is matched to a mnemonic and the item is activated.
 * - Multi-digit: |Alt-down|, |1|, |1|, |Alt-up| navigates to item 11.
 * - [Alt]+[Arrow] browser navigation is never overridden.
 *
 * @example
 * ```html
 * <clr-tabs clrKeyboardNavAltMnemonic>...</clr-tabs>
 * <clr-vertical-nav clrKeyboardNavAltMnemonic>...</clr-vertical-nav>
 * <div clrKeyboardNavAltMnemonic clrNavItemSelector=".my-btn" [clrNavDisabled]="overlayOpen">...</div>
 * ```
 */
@Directive({
  selector: '[clrKeyboardNavAltMnemonic]',
  standalone: true,
})
export class ClrKeyboardNavAltMnemonicDirective implements AfterViewInit, OnDestroy {
  /** CSS selector for the navigable items inside the host element. */
  @Input() clrNavItemSelector: string = DEFAULT_NAV_ITEM_SELECTOR;

  /** Set to true to disable navigation while an overlay or modal is active. */
  @Input() clrNavDisabled = false;

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  /** Fixed mapping: mnemonic number -> nav item element (assigned once at init). */
  private readonly mnemonicMap = new Map<number, HTMLElement>();

  /** Map: mnemonic number → injected icon-slot wrapper span (null when no icon found). */
  private readonly iconSlotMap = new Map<number, HTMLElement | null>();

  /** Digit characters accumulated while Alt is held. */
  private digitBuffer = '';

  /** Whether the Alt key is currently pressed. */
  private altKeyActive = false;

  ngAfterViewInit(): void {
    // Defer one tick to ensure projected content is fully rendered.
    setTimeout(() => this.assignMnemonics(), 0);
  }

  ngOnDestroy(): void {
    // Guard against the directive being destroyed while Alt is still held.
    this.resetAltState();
    // Unwrap any injected icon slots to leave the DOM clean.
    this.iconSlotMap.forEach(slot => {
      if (!slot) {
        return;
      }
      const icon = slot.querySelector('cds-icon') as HTMLElement | null;
      if (icon && slot.parentElement) {
        this.renderer.insertBefore(slot.parentElement, icon, slot);
        this.renderer.removeChild(slot.parentElement, slot);
      }
    });
    this.iconSlotMap.clear();
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if (this.clrNavDisabled) {
      return;
    }

    if (event.key === 'Alt') {
      this.altKeyActive = true;
      this.digitBuffer = '';
      this.renderer.addClass(this.el.nativeElement, MNEMONICS_VISIBLE_CLASS);
      // Suppress browser menu-bar activation on Windows/Linux.
      event.preventDefault();
      return;
    }

    // Accumulate digits while Alt is held.
    // Arrow keys are NOT handled here to preserve [Alt+Arrow] browser history navigation.
    if (this.altKeyActive && /^\d$/.test(event.key)) {
      this.digitBuffer += event.key;
      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onWindowKeyUp(event: KeyboardEvent): void {
    if (event.key !== 'Alt') {
      return;
    }

    const bufferSnapshot = this.digitBuffer;
    this.resetAltState();

    if (this.clrNavDisabled || !bufferSnapshot) {
      return;
    }

    const mnemonic = parseInt(bufferSnapshot, 10);
    const target = this.mnemonicMap.get(mnemonic);
    if (target) {
      target.click();
    }
  }

  /**
   * Reset state when the window loses focus (e.g. Alt+Tab to another app).
   * Without this the badge overlay could remain visible indefinitely.
   */
  @HostListener('window:blur')
  onWindowBlur(): void {
    this.resetAltState();
  }

  private assignMnemonics(): void {
    const items = Array.from(this.el.nativeElement.querySelectorAll(this.clrNavItemSelector)) as HTMLElement[];

    this.mnemonicMap.clear();
    this.iconSlotMap.clear();

    items.forEach((item, index) => {
      const mnemonic = index + 1;
      this.mnemonicMap.set(mnemonic, item);
      this.renderer.setAttribute(item, MNEMONIC_DATA_ATTR, String(mnemonic));

      // Find first cds-icon that is not a structural/functional icon.
      const excludedIcons = new Set(Array.from(item.querySelectorAll(EXCLUDED_ICON_SELECTOR)));
      const icon = Array.from(item.querySelectorAll('cds-icon')).find(el => !excludedIcons.has(el)) as
        | HTMLElement
        | undefined;

      if (icon) {
        // Wrap the icon so the badge can be absolutely positioned inside it.
        const slot: HTMLElement = this.renderer.createElement('span');
        this.renderer.addClass(slot, ICON_SLOT_CLASS);
        this.renderer.insertBefore(icon.parentElement!, slot, icon);
        this.renderer.appendChild(slot, icon);

        // Badge span — sits on top of the (hidden) icon.
        const badge: HTMLElement = this.renderer.createElement('span');
        this.renderer.addClass(badge, MNEMONIC_BADGE_CLASS);
        this.renderer.setAttribute(badge, 'aria-hidden', 'true');
        badge.textContent = String(mnemonic);
        this.renderer.appendChild(slot, badge);

        this.iconSlotMap.set(mnemonic, slot);
      } else {
        this.iconSlotMap.set(mnemonic, null);
      }
    });
  }

  private resetAltState(): void {
    this.altKeyActive = false;
    this.digitBuffer = '';
    this.renderer.removeClass(this.el.nativeElement, MNEMONICS_VISIBLE_CLASS);
  }
}
