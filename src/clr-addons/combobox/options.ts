/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Injector,
  OnDestroy,
  Optional,
  QueryList,
} from '@angular/core';
import {
  ɵe as POPOVER_HOST_ANCHOR,
  ɵp as AbstractPopover,
  ɵo as FocusableItem,
  ɵi as DropdownFocusHandler,
} from '@clr/angular';
import { ClrOption } from './option';
import { Point } from './utils/constants';

@Component({
  selector: 'clr-options',
  templateUrl: './options.html',
  host: { '[class.clr-options]': 'true' },
})
export class ClrOptions<T> extends AbstractPopover implements AfterContentInit, OnDestroy {
  @ContentChildren(ClrOption) options: QueryList<ClrOption<T>>;

  @ContentChildren(FocusableItem) items: QueryList<FocusableItem>;
  private focusHandler: DropdownFocusHandler;

  constructor(
    injector: Injector,
    @Optional()
    @Inject(POPOVER_HOST_ANCHOR)
    parentHost: ElementRef
  ) {
    if (!parentHost) {
      throw new Error('clr-options should only be used inside of a clr-combobox');
    }
    super(injector, parentHost);

    // Configure Popover
    this.configurePopover();
    this.focusHandler = injector.get(DropdownFocusHandler);
  }

  /**
   * Configure Popover Direction and Close indicators
   */
  private configurePopover(): void {
    this.anchorPoint = Point.BOTTOM_LEFT;
    this.popoverPoint = Point.LEFT_TOP;
    this.closeOnOutsideClick = true;
  }

  // Lifecycle hooks
  ngAfterContentInit(): void {
    // set anchor element for dropdown to the input
    this.anchorElem = this.parentHost.nativeElement.getElementsByClassName('clr-combobox-input')[0] || this.anchorElem;
    this.focusHandler.container = this.el.nativeElement;
    this.items.changes.subscribe(() => this.focusHandler.addChildren(this.items.toArray()));
    // I saw this on GitHub as a solution to avoid code duplication because of missed QueryList changes
    this.items.notifyOnChanges();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.focusHandler.resetChildren();
  }
}
