/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrReadonlyCombobox } from './readonly-combobox.directive';

@NgModule({
  declarations: [ClrReadonlyCombobox],
  exports: [ClrReadonlyCombobox],
})
export class ClrReadonlyComboboxModule {}
