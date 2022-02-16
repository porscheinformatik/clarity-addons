/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrQuickList } from './quick-list';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ClrAddOption } from './add-option';

@NgModule({
  imports: [CommonModule, FormsModule, ClarityModule, ClrFormsModule],
  declarations: [ClrQuickList, ClrAddOption],
  exports: [ClrQuickList],
})
export class ClrQuickListModule {}
