/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-readonly-demo',
  templateUrl: './readonly.demo.html',
})
export class ReadonlyDemo {
  radioValue: number = 1;
  checkValue1: boolean = true;
  checkValue2: boolean;
  checkValue3: boolean = true;
}
