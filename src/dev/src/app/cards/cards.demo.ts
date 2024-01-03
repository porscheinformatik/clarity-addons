/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityIcons, ellipsisVerticalIcon } from '@cds/core/icon';

ClarityIcons.addIcons(ellipsisVerticalIcon);

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './cards.demo.html',
})
export class CardsDemo {}
