/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { ClrNumericField } from './numericfield';

@NgModule({
  imports: [CommonModule, ClarityModule, ClrFormsModule, FormsModule],
  declarations: [ClrNumericField],
  exports: [ClrNumericField],
})
export class ClrNumericFieldModule {}
