/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[clrTime]',
  host: {
    '[class.clr-input]': 'true',
  },
})
export class ClrTimeInput {}
