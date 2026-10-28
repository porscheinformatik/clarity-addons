/*
 * Copyright (c) 2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrBrandAvatar } from './brand-avatar';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrBrandAvatar` directly instead.
 */
@NgModule({
  imports: [ClrBrandAvatar],
  exports: [ClrBrandAvatar],
})
export class ClrBrandAvatarModule {}
