/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, Injector, ElementRef, Renderer2, OnDestroy } from '@angular/core';

let instances = 0;

@Component({
  selector: 'clr-main-nav-group',
  templateUrl: './main-nav-group.html',
  styleUrls: ['./main-nav-group.scss'],
})
export class ClrMainNavGroup implements OnDestroy {
  @Input('clrTitle') title: string;

  protected el: ElementRef;
  protected renderer: Renderer2;
  private prefix = 'mainNavGroup';
  private id: number;
  private hostClickListener: () => void;
  private documentClickListener: () => void;

  constructor(injector: Injector) {
    this.el = injector.get(ElementRef);
    this.renderer = injector.get(Renderer2);
    this.id = ++instances;
    this.attachOutsideClickListener();
  }

  ngOnDestroy() {
    this.detachOutsideClickListener();
  }

  onClick(event) {
    // toggle hidden checkbox when clickng nav group div
    const input = <HTMLInputElement>document.getElementById(this.prefix + this.id);
    input.checked = !input.checked;
  }

  private uncheckInputs(selector: string) {
    selector = 'clr-main-container:not(.open-hamburger-menu) ' + selector;
    const hiddenInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(selector);
    for (let i = 0; i < hiddenInputs.length; i++) {
      // tslint:disable-line:prefer-for-of
      hiddenInputs[i].checked = false;
    }
  }

  private attachOutsideClickListener() {
    this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', event => {
      this.uncheckInputs('[id^=' + this.prefix + ']:not(#' + this.prefix + this.id + ')');
      if (!event.target.classList.contains('dropdown-item')) {
        // stop click handler for grouping items, otherwise hamburger menu gets closed
        event.stopPropagation();
      }
    });

    this.documentClickListener = this.renderer.listen('document', 'click', event => {
      this.uncheckInputs('#' + this.prefix + this.id);
    });
  }

  private detachOutsideClickListener() {
    if (this.hostClickListener) {
      this.hostClickListener();
      delete this.hostClickListener;
    }
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = undefined;
    }
  }
}
