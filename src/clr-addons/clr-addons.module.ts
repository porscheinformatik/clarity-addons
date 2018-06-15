/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrViewEditSectionModule } from './view-edit-section/view-edit-section.module';
import { ClrPagerModule } from './pager/pager.module';

@NgModule({
  exports: [ClrViewEditSectionModule, ClrPagerModule],
})
export class ClrAddonsModule {}
