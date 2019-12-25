/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { ClrDateTimeContainer } from './date-time-container';
import { ClrTimeInput } from './time-input';

@NgModule({
  imports: [CommonModule, ClarityModule, ClrFormsModule, FormsModule],
  declarations: [ClrDateTimeContainer, ClrTimeInput],
  exports: [ClrDateTimeContainer, ClrTimeInput],
})
export class ClrDateTimeModule {}
