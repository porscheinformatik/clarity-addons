/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrGenericQuickList } from './generic-quick-list';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrGenericQuickList` directly instead.
 */
@NgModule({
  imports: [ClrGenericQuickList],
  exports: [ClrGenericQuickList],
})
export class ClrGenericQuickListModule {}
