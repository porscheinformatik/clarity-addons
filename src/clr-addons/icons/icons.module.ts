/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons } from '@clr/icons';
import { AllShapes } from '@clr/icons/shapes/all-shapes';
import { ClrAddonsIconShapes } from './shapes';

/**
 * Adds custom icons to the ClarityIcons Api
 *
 * @see {@link https://clarity.design/icons/api}
 */
export function loadIcons() {
  return () => {
    // Add all available shapes from clarity, per default only the core-shapes are loaded.
    ClarityIcons.add(AllShapes);
    // Add our custom shapes
    ClarityIcons.add(ClrAddonsIconShapes);
  };
}

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadIcons,
      multi: true,
    },
  ],
})
export class ClrAddonsIconsModule {}
