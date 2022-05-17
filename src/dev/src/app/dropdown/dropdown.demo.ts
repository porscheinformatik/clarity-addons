/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './dropdown.demo.html',
})
export class DropdownDemo {
  public getDemoArrayWithSize(size: number): number[] {
    return [...Array(size).keys()];
  }
}
