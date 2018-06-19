/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrPagedSearchResultList } from './paged-search-result-list';
import { ClrPagerModule } from '../pager/pager.module';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule, ClrPagerModule],
  declarations: [ClrPagedSearchResultList],
  exports: [ClrPagedSearchResultList],
})
export class ClrPagedSearchResultListModule {}
