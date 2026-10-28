/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrLetterAvatar } from './letter-avatar';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrLetterAvatar` directly instead.
 */
@NgModule({
  imports: [ClrLetterAvatar],
  exports: [ClrLetterAvatar],
})
export class ClrLetterAvatarModule {}
