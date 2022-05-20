/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrRequiredAllMultilang, ClrRequiredOneMultilang } from './multilingual-validators';
import { ClrMultilingualInput } from './multilingual-input/multilingual-input';
import { ClrMultilingualTextarea } from './multilingual-textarea/multilingual-textarea';
import { ClrMultilingualSelector } from './multilingual-selector';
import { ClrDropdownOverflowModule } from '../dropdown';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule, ClrDropdownOverflowModule],
  declarations: [
    ClrMultilingualInput,
    ClrMultilingualTextarea,
    ClrRequiredOneMultilang,
    ClrRequiredAllMultilang,
    ClrMultilingualSelector,
  ],
  exports: [
    ClrMultilingualInput,
    ClrMultilingualTextarea,
    ClrRequiredOneMultilang,
    ClrRequiredAllMultilang,
    ClrMultilingualSelector,
  ],
})
export class ClrMultilingualModule {}
