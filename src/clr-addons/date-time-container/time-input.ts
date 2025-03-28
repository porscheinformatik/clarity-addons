/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[clrTime]',
  host: {
    '[class.clr-input]': 'true',
  },
  standalone: false,
})
export class ClrTimeInput {}
