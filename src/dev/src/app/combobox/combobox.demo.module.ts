/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { BasicNgComboboxDemo } from './basic-ng-combobox';
import { OptionalMenuDemo } from './optional-menu';
import { ComboboxDemo } from './combobox.demo';
import { ROUTING } from './combobox.demo.routing';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, ClrAddonsModule],
  declarations: [ComboboxDemo, BasicNgComboboxDemo, OptionalMenuDemo],
  exports: [ComboboxDemo, BasicNgComboboxDemo, OptionalMenuDemo],
})
export class ComboboxDemoModule {}
