/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ElementRef, HostBinding, Injector, Input, ViewChild, Directive } from '@angular/core';
import { ClrAbstractFormComponent } from '../abstract-form-component/abstract-form-component';

@Directive()
export abstract class ClrMultilingualAbstract extends ClrAbstractFormComponent {
  @HostBinding('class.clr-multilingual') multi = true;

  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';
  @Input('clrSelectedLang') selectedLang: string;

  @ViewChild('input') inputElement: ElementRef;

  textarea = false;
  private _texts: Map<string, string>;

  constructor(injector: Injector) {
    super(injector);
  }

  changeLanguage(key: string) {
    // need as the click for closing the menu is registered on a single item
    // if the language change destroys it immediately, the click won't get fired
    setTimeout(() => {
      this.selectedLang = key;
      this.inputElement.nativeElement.focus();
    }, 0);
  }

  setText(key: string, value: string) {
    this._texts.set(key, value);
    this.onChange(new Map(this._texts));
  }

  get texts() {
    return this._texts;
  }

  writeValue(value: Map<string, string>): void {
    if (!!value) {
      this._texts = new Map(value);
    }
  }
}
