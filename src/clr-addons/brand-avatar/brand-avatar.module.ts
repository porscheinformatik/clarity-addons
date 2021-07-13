/*
 * Copyright (c) 2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { ClrBrandAvatar } from './brand-avatar';

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [ClrBrandAvatar],
  exports: [ClrBrandAvatar],
})
export class ClrBrandAvatarModule {}
