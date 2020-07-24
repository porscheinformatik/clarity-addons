/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ClrAbstractFormComponent } from '../abstract-form-component/abstract-form-component';
import { Component, ElementRef, HostBinding, Injector, Input, ViewChild } from '@angular/core';

@Component({ template: '' })
export abstract class ClrMultilingualAbstract extends ClrAbstractFormComponent {
  @HostBinding('class.clr-multilingual') multi = true;

  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';
  @Input('clrSelectedLang') selectedLang: string;
  @Input() readonly: string;
  /** Show language selector when only one language provided */
  @Input('clrShowSingleLanguageSelector') showSingleLanguageSelector: boolean;

  @ViewChild('input') inputElement: ElementRef;

  texts: Map<string, string>;

  protected constructor(injector: Injector) {
    super(injector);
  }

  writeValue(value: any): void {
    if (value) {
      this.texts = new Map(value);
    }
  }

  setText(key: string, value: string): void {
    this.texts.set(key, value);
    this.onChange(new Map(this.texts));
  }

  showLanguageSelector(): boolean {
    return (this.texts && this.texts.size > 1) || this.showSingleLanguageSelector;
  }

  changeLanguage(lang: string): void {
    setTimeout(() => {
      this.selectedLang = lang;
      this.inputElement.nativeElement.focus();
    }, 0);
  }
}
