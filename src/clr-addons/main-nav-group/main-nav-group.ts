/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Component,
  Input,
  Injector,
  ElementRef,
  Renderer2,
  OnDestroy,
  OnInit,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { ClrMainNavGroupItem } from './main-nav-group-item';

let instances = 0;

enum ArrowKeyDirection {
  UP,
  DOWN,
}

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
  private unlistenFuncs: { (): void }[] = [];
  private ignore: any;

  @ContentChildren(ClrMainNavGroupItem) items: QueryList<ClrMainNavGroupItem>;
  private currentFocusedId = 0;

  constructor(injector: Injector) {
    this.el = injector.get(ElementRef);
    this.renderer = injector.get(Renderer2);
  }

  ngOnInit(): void {
    this.id = ++instances;
    this.listenForCloseEvents();
    this.attachResizeListener();
    this.listenToArrowKeys();
  }

  ngOnDestroy(): void {
    this.detachListener();
  }

  onClick(event: any): void {
    const input = document.getElementById(this.prefix + this.id) as HTMLInputElement;
    if (event.target.classList.contains('collapsible')) {
      // toggle hidden checkbox when clicking nav group div
      input.checked = !input.checked;
      if (input.checked) {
        this.focusFirstItemOnOpen();
      }
    }
    if (event.target.classList.contains('nav-trigger')) {
      // '!checked' as the nav-trigger click comes before the update of the checkbox
      if (!input.checked) {
        this.focusFirstItemOnOpen();
      }
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

  private closeMenus(selector: string): void {
    selector = '.main-container:not(.open-hamburger-menu) ' + selector;
    const hiddenInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(selector);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < hiddenInputs.length; i++) {
      hiddenInputs[i].checked = false;
    }
  }

  private listenForCloseEvents(): void {
    this.unlistenFuncs.push(
      this.renderer.listen(this.el.nativeElement, 'click', event => {
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
      })
    );

    this.unlistenFuncs.push(
      this.renderer.listen('document', 'click', event => {
        /* close menu when clicking anywhere in the document */
        if (this.ignore === event) {
          delete this.ignore;
        } else {
          this.closeMenus('#' + this.prefix + this.id);
        }
      })
    );

    this.unlistenFuncs.push(
      this.renderer.listen(this.el.nativeElement, 'keydown.tab', () => {
        this.closeMenus('#' + this.prefix + this.id);
      })
    );

    this.unlistenFuncs.push(
      this.renderer.listen(this.el.nativeElement, 'keydown.shift.tab', () => {
        this.closeMenus('#' + this.prefix + this.id);
      })
    );

    this.unlistenFuncs.push(
      this.renderer.listen(this.el.nativeElement, 'keydown.esc', () => {
        this.closeMenus('#' + this.prefix + this.id);
      })
    );
  }

  private attachResizeListener(): void {
    this.unlistenFuncs.push(
      this.renderer.listen('window', 'resize', () => {
        /* when resizing window above 768, remove open-hamburger-menu when present */
        if (!window.matchMedia('(max-width: 992px)').matches) {
          const hamburgerMenu = this.el.nativeElement.closest('.open-hamburger-menu') as Element;
          if (hamburgerMenu) {
            hamburgerMenu.classList.remove('open-hamburger-menu');
            this.closeMenus('[id^=' + this.prefix + ']');
          }
        }
      })
    );
  }

  private detachListener(): void {
    this.unlistenFuncs.forEach((unlisten: () => void) => unlisten());
  }

  private listenToArrowKeys(): void {
    this.unlistenFuncs.push(
      this.renderer.listen(this.el.nativeElement, 'keydown.arrowup', () => this.move(ArrowKeyDirection.UP))
    );
    this.unlistenFuncs.push(
      this.renderer.listen(this.el.nativeElement, 'keydown.arrowdown', () => this.move(ArrowKeyDirection.DOWN))
    );
  }

  private move(direction: ArrowKeyDirection): void {
    if (!this.items || this.items.length <= 0) {
      return;
    }

    this.items.toArray()[this.currentFocusedId].blur();

    if (direction === ArrowKeyDirection.DOWN) {
      this.currentFocusedId = this.currentFocusedId >= this.items.length - 1 ? 0 : this.currentFocusedId + 1;
    } else if (direction === ArrowKeyDirection.UP) {
      this.currentFocusedId = this.currentFocusedId === 0 ? this.items.length - 1 : this.currentFocusedId - 1;
    }

    this.items.toArray()[this.currentFocusedId].focus();
  }

  private focusFirstItemOnOpen(): void {
    if (!this.items || this.items.length <= 0) {
      return;
    }
    this.items.forEach(item => item.blur());

    this.currentFocusedId = 0;
    setTimeout(() => this.items.toArray()[this.currentFocusedId].focus());
  }
}
