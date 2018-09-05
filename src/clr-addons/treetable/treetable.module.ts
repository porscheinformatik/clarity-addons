/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';
import { ClrTreetableRow } from './treetable-row';
import { ClrTreetable } from './treetable';

@NgModule({
  imports: [CommonModule, ClarityModule, ClrDatagridModule],
  declarations: [ClrTreetable, ClrTreetableRow],
  exports: [ClrTreetable, ClrTreetableRow],
})
export class ClrTreetableModule {}
