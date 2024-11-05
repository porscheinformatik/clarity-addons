/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrActionPanel } from './action-panel';
import { ClrActionPanelContainer } from './action-panel-container';
import { ClrActionPanelContainerContent } from './action-panel-container-content';
import { ClrActionPanelContainerFooter } from './action-panel-container-footer';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [
    ClrActionPanel,
    ClrActionPanelContainer,
    ClrActionPanelContainerContent,
    ClrActionPanelContainerFooter,
  ],
  exports: [ClrActionPanel, ClrActionPanelContainer, ClrActionPanelContainerContent, ClrActionPanelContainerFooter],
})
export class ClrActionPanelModule {}
