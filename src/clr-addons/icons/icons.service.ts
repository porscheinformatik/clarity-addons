/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { ClarityIcons } from '@clr/icons';
import { ClrAddonsIconShapes } from './shapes';

@Injectable()
export class ClrIconsService {
  /**
   * Adds custom icons to the ClarityIcons Api
   *
   * @see {@link https://clarity.design/icons/api}
   */
  loadIcons() {
    ClarityIcons.add(ClrAddonsIconShapes);
  }
}
