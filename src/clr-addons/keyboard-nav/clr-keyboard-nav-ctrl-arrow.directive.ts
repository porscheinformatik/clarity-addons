/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

/** Default CSS selector matching navigable items in common Clarity navigation components. */
const DEFAULT_NAV_ITEM_SELECTOR = '[clrVerticalNavLink], [clrTabLink]';

/**
 * Directive that enables circular keyboard navigation using Ctrl+Arrow keys.
 *
 * - **Ctrl+Left** / **Ctrl+Up**: navigate to the previous item (wraps to last).
 * - **Ctrl+Right** / **Ctrl+Down**: navigate to the next item (wraps to first).
 *
 * The order of items is fixed at the time the page loads and does not change for
 * the lifetime of the directive, regardless of visual reordering (e.g. overflow menus).
 *
 * Navigation is suppressed while `clrNavDisabled` is `true` (e.g. when an overlay is open).
 *
 * @example
 * ```html
 * <!-- Horizontal navigation (tabs) -->
 * <clr-tabs clrKeyboardNavCtrlArrow clrNavOrientation="horizontal">…</clr-tabs>
 *
 * <!-- Vertical navigation (sidebar) -->
 * <clr-vertical-nav clrKeyboardNavCtrlArrow clrNavOrientation="vertical">…</clr-vertical-nav>
 *
 * <!-- Custom selector + overlay guard -->
 * <div clrKeyboardNavCtrlArrow
 *      clrNavItemSelector=".my-nav-btn"
 *      [clrNavDisabled]="isOverlayOpen">…</div>
 * ```
 */
@Directive({
  selector: '[clrKeyboardNavCtrlArrow]',
  standalone: true,
})
export class ClrKeyboardNavCtrlArrowDirective implements AfterViewInit {
  /**
   * CSS selector for the navigable items inside the host element.
   * Defaults to Clarity's vertical-nav links and tab-links.
   */
  @Input() clrNavItemSelector: string = DEFAULT_NAV_ITEM_SELECTOR;

  /**
   * Restricts which arrow directions trigger navigation:
   * - `'horizontal'` – only Ctrl+Left / Ctrl+Right
   * - `'vertical'`   – only Ctrl+Up   / Ctrl+Down
   * - `'both'`       – all four directions (default)
   */
  @Input() clrNavOrientation: 'horizontal' | 'vertical' | 'both' = 'both';

  /**
   * Set to `true` to temporarily disable all keyboard navigation,
   * e.g. while an overlay or modal dialog is open.
   */
  @Input() clrNavDisabled = false;

  private readonly el = inject(ElementRef);

  /** Items captured at initialization time – order is fixed per spec. */
  private navItems: HTMLElement[] = [];

  ngAfterViewInit(): void {
    // Defer one tick to ensure the host component has projected and rendered all content.
    setTimeout(() => {
      this.navItems = Array.from(this.el.nativeElement.querySelectorAll(this.clrNavItemSelector)) as HTMLElement[];
    }, 0);
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if (this.clrNavDisabled || !event.ctrlKey) {
      return;
    }

    const { key } = event;
    const isLeft = key === 'ArrowLeft';
    const isRight = key === 'ArrowRight';
    const isUp = key === 'ArrowUp';
    const isDown = key === 'ArrowDown';

    if (!isLeft && !isRight && !isUp && !isDown) {
      return;
    }
    if (this.clrNavOrientation === 'horizontal' && (isUp || isDown)) {
      return;
    }
    if (this.clrNavOrientation === 'vertical' && (isLeft || isRight)) {
      return;
    }

    // Filter out items that are currently not reachable.
    const navigable = this.navItems.filter(item => this.isNavigable(item));
    if (!navigable.length) {
      return;
    }

    const currentIndex = this.findActiveIndex(navigable);
    let nextIndex: number;

    if (isLeft || isUp) {
      // Backward – wrap to last item when on first.
      nextIndex = currentIndex <= 0 ? navigable.length - 1 : currentIndex - 1;
    } else {
      // Forward – wrap to first item when on last.
      nextIndex = currentIndex >= navigable.length - 1 ? 0 : currentIndex + 1;
    }

    event.preventDefault();
    event.stopPropagation();
    navigable[nextIndex].click();
  }

  /** Returns `true` when the item is currently usable (not hidden, not disabled). */
  private isNavigable(item: HTMLElement): boolean {
    return !item.hidden && !(item as HTMLButtonElement).disabled;
  }

  /**
   * Returns the index of the currently active item, or `-1` if none is found.
   * Checks `aria-current`, `aria-selected="true"`, and the `.active` CSS class.
   */
  private findActiveIndex(items: HTMLElement[]): number {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        item.hasAttribute('aria-current') ||
        item.getAttribute('aria-selected') === 'true' ||
        item.classList.contains('active')
      ) {
        return i;
      }
    }
    // No active item found – returning -1 causes the first/last item to be selected
    // on the next navigation event, which is intuitive fallback behaviour.
    return -1;
  }
}
