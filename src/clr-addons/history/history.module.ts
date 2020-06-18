/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClrHistory } from './history';
import { RouterModule } from '@angular/router';
import { ClrHistoryPinned } from './history-pinned';

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule],
  declarations: [ClrHistory, ClrHistoryPinned],
  exports: [ClrHistory, ClrHistoryPinned],
})
export class ClrHistoryModule {}
