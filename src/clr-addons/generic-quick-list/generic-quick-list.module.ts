/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrGenericQuickList } from './generic-quick-list';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [ClrGenericQuickList],
  exports: [ClrGenericQuickList],
})
export class ClrGenericQuickListModule {}
