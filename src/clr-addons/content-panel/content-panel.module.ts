/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { ClrContentPanel } from './content-panel';
import { ClrContentPanelContainer } from './content-panel-container';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule, BrowserAnimationsModule],
  declarations: [ClrContentPanel, ClrContentPanelContainer],
  exports: [ClrContentPanel, ClrContentPanelContainer],
})
export class ClrContentPanelModule {}
