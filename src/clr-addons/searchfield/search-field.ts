/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[clrSearch]',
  host: { '[class.search-input]': 'true' },
})
export class ClrSearchField implements OnInit, OnDestroy, AfterViewInit {
  private keyupListener: () => void;

  private deleteSymbol: HTMLElement;
  private deleteButton: HTMLElement;
  private searchSymbol: HTMLElement;

  constructor(private renderer: Renderer2, private inputEl: ElementRef) {}

  ngOnInit() {
    this.keyupListener = this.renderer.listen(this.inputEl.nativeElement, 'keyup', event => {
      const value: string = event.target.value;
      if (!!value) {
        this.renderer.addClass(this.inputEl.nativeElement.parentNode, 'has-value');
      } else {
        this.renderer.removeClass(this.inputEl.nativeElement.parentNode, 'has-value');
      }
    });
  }

  ngAfterViewInit() {
    this.addClassToWrapper(this.inputEl.nativeElement.parentNode);
    this.injectSearchIcon();
    this.injectDeleteIcon();
  }

  ngOnDestroy() {
    this.detachListener();
  }

  clearSearchInput() {
    this.renderer.setProperty(this.inputEl.nativeElement, 'value', '');
    this.renderer.removeClass(this.inputEl.nativeElement.parentNode, 'has-value');
    const event = document.createEvent('Event');
    event.initEvent('input', false, false);
    this.inputEl.nativeElement.dispatchEvent(event);
  }

  private injectDeleteIcon(): void {
    // Get the input wrapper and apply necessary styles
    const inputWrapper = this.inputEl.nativeElement.parentNode;

    if (!this.deleteSymbol) {
      this.deleteButton = this.renderer.createElement('button');
      this.renderer.setAttribute(this.deleteButton, 'type', 'button');
      this.renderer.addClass(this.deleteButton, 'btn');
      this.renderer.addClass(this.deleteButton, 'btn-link');
      this.renderer.addClass(this.deleteButton, 'delete-button');

      this.deleteSymbol = this.renderer.createElement('clr-icon');
      this.renderer.setAttribute(this.deleteSymbol, 'shape', 'times');
      this.renderer.addClass(this.deleteSymbol, 'remove-symbol');
      this.deleteSymbol.addEventListener('click', () => this.clearSearchInput());
      this.renderer.appendChild(this.deleteButton, this.deleteSymbol);
      this.renderer.appendChild(inputWrapper, this.deleteButton);
    }
  }

  private injectSearchIcon(): void {
    const inputWrapper = this.inputEl.nativeElement.parentNode;

    // Create the icon and apply necessary styles
    if (!this.searchSymbol) {
      this.searchSymbol = this.renderer.createElement('clr-icon');
      this.renderer.addClass(this.searchSymbol, 'search-symbol');
      this.renderer.setAttribute(this.searchSymbol, 'shape', 'search');
      this.renderer.insertBefore(inputWrapper, this.searchSymbol, this.inputEl.nativeElement);
    }
  }

  private addClassToWrapper(inputWrapper: any) {
    this.renderer.addClass(inputWrapper, 'search-input-wrapper');
  }

  private detachListener(): void {
    if (!!this.keyupListener) {
      this.keyupListener();
      delete this.keyupListener;
    }
  }
}
