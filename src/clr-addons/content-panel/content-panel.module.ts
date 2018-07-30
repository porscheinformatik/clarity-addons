/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrContentPanel } from './content-panel';
import { ClrContentPanelContainer } from './content-panel-container';
import { ClrContentPanelContainerContent } from './content-panel-container-content';
import { ClrContentPanelContainerFooter } from './content-panel-container-footer';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [
    ClrContentPanel,
    ClrContentPanelContainer,
    ClrContentPanelContainerContent,
    ClrContentPanelContainerFooter,
  ],
  exports: [ClrContentPanel, ClrContentPanelContainer, ClrContentPanelContainerContent, ClrContentPanelContainerFooter],
})
export class ClrContentPanelModule {}
