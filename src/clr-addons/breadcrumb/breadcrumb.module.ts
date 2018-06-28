/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClrBreadcrumb } from './breadcrumb';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule],
  declarations: [ClrBreadcrumb],
  exports: [ClrBreadcrumb],
})
export class ClrBreadcrumbModule {}
