/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrActionPanel } from './action-panel';
import { ClrActionPanelContainer } from './action-panel-container';
import { ClrActionPanelContainerContent } from './action-panel-container-content';
import { ClrActionPanelContainerFooter } from './action-panel-container-footer';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrActionPanel`, `ClrActionPanelContainer`, `ClrActionPanelContainerContent`, `ClrActionPanelContainerFooter` directly instead.
 */
@NgModule({
  imports: [ClrActionPanel, ClrActionPanelContainer, ClrActionPanelContainerContent, ClrActionPanelContainerFooter],
  exports: [ClrActionPanel, ClrActionPanelContainer, ClrActionPanelContainerContent, ClrActionPanelContainerFooter],
})
export class ClrActionPanelModule {}
