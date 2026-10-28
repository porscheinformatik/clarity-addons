/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrContentPanel } from './content-panel';
import { ClrContentPanelContainer } from './content-panel-container';
import { ClrContentPanelContainerContent } from './content-panel-container-content';
import { ClrContentPanelContainerFooter } from './content-panel-container-footer';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrContentPanel`, `ClrContentPanelContainer`, `ClrContentPanelContainerContent`, `ClrContentPanelContainerFooter` directly instead.
 */
@NgModule({
  imports: [ClrContentPanel, ClrContentPanelContainer, ClrContentPanelContainerContent, ClrContentPanelContainerFooter],
  exports: [ClrContentPanel, ClrContentPanelContainer, ClrContentPanelContainerContent, ClrContentPanelContainerFooter],
})
export class ClrContentPanelModule {}
