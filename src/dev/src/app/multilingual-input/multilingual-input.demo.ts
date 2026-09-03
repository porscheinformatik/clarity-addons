/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrMultilingualInputValidators } from '@porscheinformatik/clr-addons';
import { ClarityIcons, flagIcon, linkIcon } from '@clr/angular/icon';
import { unlinkIcon } from '@clr/angular';

ClarityIcons.addIcons(flagIcon, linkIcon, unlinkIcon);

@Component({
  selector: 'clr-multilingual-input-demo',
  templateUrl: './multilingual-input.demo.html',
  standalone: false,
})
export class MultilingualInputDemo implements OnInit {
  template1 = new Map();
  template2 = new Map();
  template3 = new Map();
  templateNA = new Map();
  templateNAEmpty = new Map();
  reactive1 = new Map<string, string>();
  reactive2 = new Map<string, string>();
  templateML = new Map();
  templateWithIcons = new Map();
  templateTextareaWithIcons = new Map();
  languageIcons = new Map<string, string>();
  showSingleLanguage = false;

  exampleForm = new FormGroup({
    sample1: new FormControl(this.reactive1, {
      updateOn: 'blur',
      validators: [ClrMultilingualInputValidators.requiredAll()],
    }),
    sample2: new FormControl(this.reactive2, {
      updateOn: 'blur',
      validators: [ClrMultilingualInputValidators.requiredAll()],
    }),
  });

  ngOnInit(): void {
    this.template1.set('ww', 'dummy lang with widest letters');
    this.template1.set('en', 'english text');
    this.template1.set('de', 'deutscher text');
    this.template1.set('fr', 'texte français');

    this.template2.set('en', 'english text');
    this.template2.set('de', 'deutscher text');
    this.template2.set('fr', 'texte français');

    this.template3.set('en', 'english text');

    this.reactive1.set('en', 'english text');
    this.reactive1.set('de', 'deutscher text');
    this.reactive1.set('fr', 'texte français');

    this.reactive2.set('en', 'english text');
    this.reactive2.set('de', 'deutscher text');
    this.reactive2.set('fr', 'texte français');

    this.templateML.set('ww', 'Test');
    this.templateML.set('en', 'Test');

    this.templateWithIcons.set('en', 'english text');
    this.templateWithIcons.set('de', 'deutscher text');
    this.templateWithIcons.set('fr', 'texte français');
    this.templateTextareaWithIcons.set('en', 'english text\nsecond line');
    this.templateTextareaWithIcons.set('de', 'deutscher text\nzweite zeile');
    this.templateTextareaWithIcons.set('fr', 'texte français\ndeuxième ligne');
    this.languageIcons.set('de', 'link');
    this.languageIcons.set('en', 'unlink');
    this.languageIcons.set('fr', 'flag');

    this.templateNA.set('en', 'Test');
    this.templateNA.set('na', 'Dont show this');
  }
}
