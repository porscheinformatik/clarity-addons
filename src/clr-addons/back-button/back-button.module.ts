/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrBackButton } from './back-button';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrBackButton` directly instead.
 */
@NgModule({
  imports: [ClrBackButton],
  exports: [ClrBackButton],
})
export class ClrBackButtonModule {}
