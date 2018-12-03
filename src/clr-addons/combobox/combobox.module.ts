/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClrIconModule } from '@clr/angular';

import { ClrOption } from './option';
import { ClrOptions } from './options';
import { ClrCombobox } from './combobox';

@NgModule({
  imports: [CommonModule, ClrIconModule],
  declarations: [ClrCombobox, ClrOptions, ClrOption],
  exports: [ClrCombobox, ClrOptions, ClrOption],
})
export class ClrComboboxModule {}
