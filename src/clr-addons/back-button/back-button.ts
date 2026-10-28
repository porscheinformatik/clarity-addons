/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { arrowIcon, ClarityIcons, ClrIcon } from '@clr/angular';

ClarityIcons.addIcons(arrowIcon);

@Component({
  selector: 'clr-back-button',
  templateUrl: './back-button.html',
  imports: [ClrIcon],
})
export class ClrBackButton {
  constructor(private location: Location) {}

  public back(): void {
    this.location.back();
  }
}
