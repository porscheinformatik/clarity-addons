/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, Injector, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';

let instances = 0;

@Component({
  selector: 'clr-main-nav-group',
  templateUrl: './main-nav-group.html',
  host: { '[class.main-nav-group]': 'true' },
})
export class ClrMainNavGroup implements OnInit, OnDestroy {
  @Input('clrTitle') title: string;

  prefix = 'mainNavGroup';
  id: number;
  protected el: ElementRef;
  protected renderer: Renderer2;
  private hostClickListener: () => void;
  private documentClickListener: () => void;
  private windowResizeListener: () => void;
  private ignore;

  constructor(injector: Injector) {
    this.el = injector.get(ElementRef);
    this.renderer = injector.get(Renderer2);
  }

  ngOnInit() {
    this.id = ++instances;
    this.attachOutsideClickListener();
    this.attachResizeListener();
  }

  ngOnDestroy() {
    this.detachListener();
  }

  onClick(event) {
    if (event.target.classList.contains('collapsible')) {
      // toggle hidden checkbox when clickng nav group div
      const input = <HTMLInputElement>document.getElementById(this.prefix + this.id);
      input.checked = !input.checked;
    }
  }

  isActive(): boolean {
    /* is active outside hamburger menu */
    return this.el.nativeElement.classList.contains('active') && !this.el.nativeElement.closest('.open-hamburger-menu');
  }

  isChecked(): boolean {
    /* expand to currently active menu inside hamburger menu */
    return this.el.nativeElement.classList.contains('active') && this.el.nativeElement.closest('.open-hamburger-menu');
  }

  private closeMenus(selector: string) {
    selector = '.main-container:not(.open-hamburger-menu) ' + selector;
    const hiddenInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(selector);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < hiddenInputs.length; i++) {
      hiddenInputs[i].checked = false;
    }
  }

  private attachOutsideClickListener() {
    this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', event => {
      /* close other menus when opening this one */
      this.closeMenus('[id^=' + this.prefix + ']:not(#' + this.prefix + this.id + ')');
      if (!event.target.classList.contains('nav-link') || event.target.classList.contains('collapsible')) {
        if (event.target.closest('.open-hamburger-menu')) {
          // stop click handler for grouping items, otherwise hamburger menu gets closed
          event.stopPropagation();
        } else {
          // ignore even on document level for grouping items, otherwise menu gets closed right after it was opened
          this.ignore = event;
        }
      }
    });

    this.documentClickListener = this.renderer.listen('document', 'click', event => {
      /* close menu when clicking anywhere in the document */
      if (this.ignore === event) {
        delete this.ignore;
      } else {
        this.closeMenus('#' + this.prefix + this.id);
      }
    });
  }

  private attachResizeListener() {
    this.windowResizeListener = this.renderer.listen('window', 'resize', event => {
      /* when resizing window above 768, remove open-hamburger-menu when present */
      if (!window.matchMedia('(max-width: 992px)').matches) {
        const hamburgerMenu = <Element>this.el.nativeElement.closest('.open-hamburger-menu');
        if (hamburgerMenu) {
          hamburgerMenu.classList.remove('open-hamburger-menu');
          this.closeMenus('[id^=' + this.prefix + ']');
        }
      }
    });
  }

  private detachListener() {
    if (this.hostClickListener) {
      this.hostClickListener();
      delete this.hostClickListener;
    }
    if (this.documentClickListener) {
      this.documentClickListener();
      delete this.documentClickListener;
    }
    if (this.windowResizeListener) {
      delete this.windowResizeListener;
    }
  }
}
