/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clr-searchfield-demo',
  templateUrl: './searchfield.demo.html',
})
export class SearchFieldDemo {
  input: string = '';
  modalOpen = false;

  exampleForm = new FormGroup({
    sample: new FormControl(this.input, {
      updateOn: 'blur',
    }),
  });
}
