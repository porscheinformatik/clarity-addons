/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ClrAbstractFormComponent } from '../abstract-form-component/abstract-form-component';
import { Directive, ElementRef, HostBinding, Injector, Input, ViewChild } from '@angular/core';

@Directive()
export abstract class ClrMultilingualAbstract extends ClrAbstractFormComponent {
  @HostBinding('class.clr-multilingual') multi = true;

  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';
  @Input('clrSelectedLang') selectedLang: string;
  @Input() readonly: string;
  @Input() maxlength: number;
  @Input() rows: number;
  /** Show language selector when only one language provided */
  @Input('clrShowSingleLanguageSelector') showSingleLanguageSelector: boolean;

  @ViewChild('input') inputElement: ElementRef;

  texts: Map<string, string>;
  shownTexts: Map<string, string>;
  languages: string[];
  missingPrefix = '';
  fallbackLang: string;

  protected constructor(injector: Injector) {
    super(injector);
  }

  @Input('clrFallbackLang')
  set fallbackLanguage(fallbackLang: string) {
    this.fallbackLang = fallbackLang;
    this.updateShownTexts();
  }

  @Input('clrMissingPrefix')
  set missingPre(missingPrefix: string) {
    this.missingPrefix = missingPrefix;
    this.updateShownTexts();
  }

  @Input('clrLanguages')
  set langs(languages: string[]) {
    this.languages = languages;
    this.updateShownTexts();
  }

  writeValue(value: Map<string, string>): void {
    if (value) {
      this.texts = new Map(value);
    }
    this.updateShownTexts();
  }

  setText(key: string, value: string): void {
    this.texts.set(key, value);
    this.onChange(new Map(this.texts));
    this.updateShownTexts(key);
  }

  updateShownTexts(currentlyEditingLang?: string) {
    if (this.texts) {
      if (this.languages) {
        this.shownTexts = this.applyMissingPrefix(
          new Map(this.languages.map(lang => [lang, this.texts.get(lang) || ''])),
          currentlyEditingLang
        );
      } else {
        this.shownTexts = this.applyMissingPrefix(new Map(this.texts), currentlyEditingLang);
      }
    }
  }

  applyMissingPrefix(texts: Map<string, string>, currentlyEditingLang: string): Map<string, string> {
    if (!this.missingPrefix) {
      return texts;
    }

    let fallbackText = this.determineFallbackText();
    if (!fallbackText) {
      return texts;
    }
    fallbackText = this.missingPrefix + fallbackText;
    for (const lang of texts.keys()) {
      if (!texts.get(lang) && lang !== currentlyEditingLang) {
        texts.set(lang, fallbackText);
      }
    }
    return texts;
  }

  determineFallbackText(): string {
    const fallbackText = this.fallbackLang && this.texts.get(this.fallbackLang);
    if (fallbackText) {
      return fallbackText;
    }

    const languages = [...(this.languages || [])].sort();

    const nonEmptyTextFromShownTexts = languages.map(lang => this.texts.get(lang)).find(text => text);
    if (nonEmptyTextFromShownTexts) {
      return nonEmptyTextFromShownTexts;
    }

    const nonEmptyTextFromHiddenTexts = [...this.texts.keys()]
      .sort()
      .filter(lang => !languages.includes(lang))
      .map(lang => this.texts.get(lang))
      .find(text => text);
    if (nonEmptyTextFromHiddenTexts) {
      return nonEmptyTextFromHiddenTexts;
    }

    return undefined;
  }

  showLanguageSelector(): boolean {
    return this.shownTexts?.size > 1 || this.showSingleLanguageSelector;
  }

  changeLanguage(lang: string): void {
    // need as the click for closing the menu is registered on a single item
    // if the language change destroys it immediately, the click won't get fired
    setTimeout(() => {
      this.selectedLang = lang;
      this.inputElement.nativeElement.focus();
    });
  }
}
