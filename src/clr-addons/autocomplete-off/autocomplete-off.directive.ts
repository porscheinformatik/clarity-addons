/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'input:not([autocomplete])',
  host: {
    '[attr.autocomplete]': '"off"',
  },
})
export class ClrAutocompleteOff {}
