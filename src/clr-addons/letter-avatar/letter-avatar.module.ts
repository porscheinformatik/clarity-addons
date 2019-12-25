/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { ClrLetterAvatar } from './letter-avatar';

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [ClrLetterAvatar],
  exports: [ClrLetterAvatar],
})
export class ClrLetterAvatarModule {}
