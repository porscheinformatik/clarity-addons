/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityIcons, cogIcon } from '@clr/angular/icon';

ClarityIcons.addIcons(cogIcon);

@Component({
  selector: 'clr-back-button-demo',
  templateUrl: './back-button.demo.html',
  standalone: false,
})
export class BackButtonDemo {}
