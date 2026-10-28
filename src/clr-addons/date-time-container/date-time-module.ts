/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrDateTimeContainer } from './date-time-container';
import { ClrTimeInput } from './time-input';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrDateTimeContainer`, `ClrTimeInput` directly instead.
 */
@NgModule({
  imports: [ClrDateTimeContainer, ClrTimeInput],
  exports: [ClrDateTimeContainer, ClrTimeInput],
})
export class ClrDateTimeModule {}
