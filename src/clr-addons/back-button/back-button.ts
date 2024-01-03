/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { arrowIcon, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(arrowIcon);

@Component({
  selector: 'clr-back-button',
  templateUrl: './back-button.html',
})
export class ClrBackButton {
  constructor(private location: Location) {}

  public back(): void {
    this.location.back();
  }
}
