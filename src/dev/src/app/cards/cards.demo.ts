/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import {
  ClarityIcons,
  ClrDropdownModule,
  ClrIcon,
  ClrIfOpen,
  ClrPopoverContent,
  ellipsisVerticalIcon,
} from '@clr/angular';
import { ClrDropdownOverflowDirective } from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(ellipsisVerticalIcon);

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './cards.demo.html',
  imports: [ClrDropdownModule, ClrIcon, ClrIfOpen, ClrPopoverContent, ClrDropdownOverflowDirective],
})
export class CardsDemo {}
