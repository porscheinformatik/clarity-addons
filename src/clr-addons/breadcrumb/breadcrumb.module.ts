/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrBreadcrumb } from './breadcrumb';
import { ClrBreadcrumbService } from './breadcrumb.service';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrBreadcrumb` directly instead.
 */
@NgModule({
  imports: [ClrBreadcrumb],
  exports: [ClrBreadcrumb],
  providers: [ClrBreadcrumbService],
})
export class ClrBreadcrumbModule {}
