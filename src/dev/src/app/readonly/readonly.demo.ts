/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-readonly-demo',
  templateUrl: './readonly.demo.html',
})
export class ReadonlyDemo {
  radioValue = 1;
  checkValue1 = true;
  checkValue2: boolean;
  checkValue3 = true;
  readonly = true;
  myState = {name: 'California'};
  states = [{name: 'California'}, {name: 'Texas'}, {name: 'New York'}]
  value = '';
  selectedOption: any;

  toggleReadonly() {
    this.readonly = !this.readonly;
  }

  protected readonly Object = Object;
}
