/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrNotification } from './notification';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [ClrNotification],
})
export class ClrNotificationModule {}
