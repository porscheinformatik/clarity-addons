/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreetableRenderStep } from './render-step.enum';
import { TreetableRenderOrganizer } from './render-organizer';

@Directive({ selector: 'clr-tt-column' })
export class TreetableHeaderRenderer implements OnDestroy {
  constructor(private el: ElementRef, private renderer: Renderer2, private organizer: TreetableRenderOrganizer) {
    this.subscriptions.push(
      this.organizer.filterRenderSteps(TreetableRenderStep.CLEAR_WIDTHS).subscribe(() => this.clearWidth())
    );
  }

  private widthSet: boolean = false;

  private subscriptions: Subscription[] = [];
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private clearWidth() {
    // remove the width only if we set it.
    if (this.widthSet) {
      this.renderer.setStyle(this.el.nativeElement, 'flex', null);
    }
  }

  public computeWidth(): number {
    return this.el.nativeElement.scrollWidth || 0;
  }

  public setWidth(width: number) {
    if (this.el.nativeElement.className.indexOf('clr-col') < 0) {
      this.renderer.setStyle(this.el.nativeElement, 'flex', '0 0 ' + width + 'px');
      this.widthSet = true;
    }
  }
}
