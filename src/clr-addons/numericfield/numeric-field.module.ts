/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrNumericField } from './numeric-field';
import { ClrMaxNumeric, ClrMinNumeric } from './numeric-field-validators';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrNumericField`, `ClrMaxNumeric`, `ClrMinNumeric` directly instead.
 */
@NgModule({
  imports: [ClrNumericField, ClrMaxNumeric, ClrMinNumeric],
  exports: [ClrNumericField, ClrMaxNumeric, ClrMinNumeric],
})
export class ClrNumericFieldModule {}
