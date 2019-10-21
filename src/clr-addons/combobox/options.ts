/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Injector,
  Optional,
  QueryList,
} from '@angular/core';
import { ɵi as POPOVER_HOST_ANCHOR, ɵt as AbstractPopover } from '@clr/angular';
import { take } from 'rxjs/operators';
import { ClrOption } from './option';
import { Point } from './utils/constants';

@Component({ selector: 'clr-options', templateUrl: './options.html', host: { '[class.clr-options]': 'true' } })
export class ClrOptions<T> extends AbstractPopover implements AfterViewInit {
  @ContentChildren(ClrOption) options: QueryList<ClrOption<T>>;

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
    this.initializeSubscriptions();
    this.configurePopover();
  }

  /**
   * Configure Popover Direction and Close indicators
   */
  private configurePopover(): void {
    this.anchorPoint = Point.BOTTOM_LEFT;
    this.popoverPoint = Point.LEFT_TOP;
    this.closeOnOutsideClick = true;
  }

  private initializeSubscriptions(): void {
    this.ifOpenService.ignoredElementChange.pipe(take(1)).subscribe((el: ElementRef) => {
      if (el) {
        this.ignoredElement = el.nativeElement;
      }
    });
  }

  // Lifecycle hooks
  ngAfterViewInit() {
    // set anchor element for dropdown to the input
    this.anchorElem = this.parentHost.nativeElement.getElementsByClassName('clr-combobox-input')[0] || this.anchorElem;
  }
}
