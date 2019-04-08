/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

const NEGATIVE = '-';
const BACK_KEYCODE = 8;
const DEL_KEYCODE = 46;
const CONTROL_KEYCODES_UPPER_BORDER = 46;
const OTHER_CONTROL_KEYS = new Set([224, 91, 93]);

@Directive({
  selector: '[clrSearch]',
  host: {
    '[class.text-left]': 'textAlign === "left"',
  },
})
export class ClrSearchField implements OnInit, OnDestroy, AfterViewChecked {
  @Input('clrTextAlign') textAlign = 'left';
  @Output('clrSearchValueChange') searchValueChanged = new EventEmitter<string>();

  private displayValue: string = '';
  private originalValue: string = '';
  private _searchValue: string;
  private inputChangeListener: () => void;
  private keyupListener: () => void;

  @Input('clrSearchValue')
  set searchValue(value: string) {
    this.originalValue = value;
    this.handleInputChanged();
  }

  private deleteSymbol: HTMLElement;
  private searchSymbol: HTMLElement;
  private searchSpan: HTMLSpanElement;

  constructor(private renderer: Renderer2, private inputEl: ElementRef) {}

  ngOnInit() {
    this.keyupListener = this.renderer.listen(this.inputEl.nativeElement, 'keyup', event => {
      const value: string = event.target.value;
      if (!!value) {
        this.renderer.addClass(this.inputEl.nativeElement.parentNode, 'hasValue');
      } else {
        this.renderer.removeClass(this.inputEl.nativeElement.parentNode, 'hasValue');
      }
    });
    this.injectSearchIcon();
    this.injectDeleteIcon();
  }

  ngOnDestroy() {
    this.detachListener();
  }

  ngAfterViewChecked() {
    this.deleteSymbol.hidden = false;
  }

  handleInputChanged() {}

  formatInput(element: any, finalFormatting: boolean) {
    const cursorPos = element.selectionStart;
    const length = element.value.length;
  }

  updateInput(value: string) {
    this.displayValue = value;
    this.inputEl.nativeElement.value = value;
  }

  private injectDeleteIcon(): void {
    if (this.inputEl.nativeElement.offsetWidth !== 0) {
      // Get the input wrapper and apply necessary styles
      const inputWrapper = this.inputEl.nativeElement.parentNode;
      this.addClassToWrapper(inputWrapper);

      if (!this.deleteSymbol) {
        this.deleteSymbol = this.renderer.createElement('clr-icon');
        this.renderer.setAttribute(this.deleteSymbol, 'shape', 'times');
        this.deleteSymbol.hidden = true;
        this.renderer.addClass(this.deleteSymbol, 'remove');
        this.renderer.addClass(this.deleteSymbol, 'deleteSymbolPosition');
        this.deleteSymbol.addEventListener('click', () => this.clearSearchInput());
        this.renderer.appendChild(inputWrapper, this.deleteSymbol);
      }
    }
  }

  clearSearchInput() {
    this.renderer.setProperty(this.inputEl.nativeElement, 'value', '');
  }
  private injectSearchIcon(): void {
    if (this.inputEl.nativeElement.offsetWidth !== 0) {
      // Get the input wrapper and apply necessary styles
      const inputWrapper = this.inputEl.nativeElement.parentNode;
      this.addClassToWrapper(inputWrapper);

      this.searchSymbol = this.renderer.createElement('clr-icon');
      this.renderer.addClass(this.searchSymbol, 'searchSymbolPosition');
      this.renderer.setAttribute(this.searchSymbol, 'shape', 'search');
      this.renderer.insertBefore(inputWrapper, this.searchSymbol, this.inputEl.nativeElement);

      // Create the span with the icon and apply necessary styles
      if (!this.searchSpan) {
        this.searchSpan = this.renderer.createElement('span');
        this.renderer.addClass(this.searchSpan, 'icon');
        this.renderer.appendChild(this.searchSpan, this.searchSymbol);
        this.renderer.appendChild(inputWrapper, this.searchSpan);
      }

      this.renderer.addClass(this.searchSpan, 'pos-left');
      this.renderer.setStyle(this.inputEl.nativeElement, 'padding-left', '26px');
    }
  }

  private addClassToWrapper(inputWrapper: any) {
    this.renderer.addClass(inputWrapper, 'search-input-wrapper');
  }

  private detachListener(): void {
    if (!!this.inputChangeListener) {
      this.inputChangeListener();
      delete this.inputChangeListener;
    }
    if (!!this.keyupListener) {
      this.keyupListener();
      delete this.keyupListener;
    }
  }
}
