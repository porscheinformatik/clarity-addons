/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClrMultilingualInputValidators } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-multilingual-input-demo',
  templateUrl: './multilingual-input.demo.html',
})
export class MultilingualInputDemo implements OnInit {
  template1 = new Map();
  template2 = new Map();
  reactive1 = new Map();
  reactive2 = new Map();

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

  ngOnInit() {
    this.template1.set('EN', 'english text');
    this.template1.set('DE', 'deutscher text');
    this.template1.set('FR', 'texte français');
    this.template2.set('EN', 'english text');
    this.template2.set('DE', 'deutscher text');
    this.template2.set('FR', 'texte français');
    this.reactive1.set('EN', 'english text');
    this.reactive1.set('DE', 'deutscher text');
    this.reactive1.set('FR', 'texte français');
    this.reactive2.set('EN', 'english text');
    this.reactive2.set('DE', 'deutscher text');
    this.reactive2.set('FR', 'texte français');
  }
}
