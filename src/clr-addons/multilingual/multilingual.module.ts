/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrRequiredAllMultilang, ClrRequiredOneMultilang } from './multilingual-validators';
import { ClrMultilingualInput } from './multilingual-input/multilingual-input';
import { ClrMultilingualTextarea } from './multilingual-textarea/multilingual-textarea';
import { ClrMultilingualSelector } from './multilingual-selector';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrMultilingualInput`, `ClrMultilingualTextarea`, `ClrRequiredOneMultilang`, `ClrRequiredAllMultilang`, `ClrMultilingualSelector` directly instead.
 */
@NgModule({
  imports: [
    ClrMultilingualInput,
    ClrMultilingualTextarea,
    ClrRequiredOneMultilang,
    ClrRequiredAllMultilang,
    ClrMultilingualSelector,
  ],
  exports: [
    ClrMultilingualInput,
    ClrMultilingualTextarea,
    ClrRequiredOneMultilang,
    ClrRequiredAllMultilang,
    ClrMultilingualSelector,
  ],
})
export class ClrMultilingualModule {}
