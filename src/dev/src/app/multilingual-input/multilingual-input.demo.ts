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
  data = new Map();
  data2 = new Map();

  exampleForm = new FormGroup({
    sample: new FormControl(this.data2, {
      updateOn: 'blur',
      validators: [ClrMultilingualInputValidators.requiredAll()],
    }),
  });

  ngOnInit() {
    this.data.set('EN', 'english text');
    this.data.set('DE', 'deutscher text');
    this.data2.set('EN', 'english text');
    this.data2.set('DE', 'deutscher text');
  }
}
