/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule, ClrIcon } from '@clr/angular';

import { ClrIconAvatar } from './icon-avatar';

@NgModule({
  imports: [CommonModule, ClarityModule, ClrIcon],
  declarations: [ClrIconAvatar],
  exports: [ClrIconAvatar],
})
export class ClrIconAvatarModule {}
