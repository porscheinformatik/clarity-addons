/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrCollapseExpandSection } from './collapse-expand-section';
import { CollapseExpandSectionTitleDirective } from './directives/collapse-expand-section-title.directive';
import { CollapseExpandSectionSubtitleDirective } from './directives/collapse-expand-section-subtitle.directive';
import { CollapseExpandSectionContentDirective } from './directives/collapse-expand-section-content.directive';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [
    ClrCollapseExpandSection,
    CollapseExpandSectionTitleDirective,
    CollapseExpandSectionSubtitleDirective,
    CollapseExpandSectionContentDirective,
  ],
  exports: [
    ClrCollapseExpandSection,
    CollapseExpandSectionTitleDirective,
    CollapseExpandSectionSubtitleDirective,
    CollapseExpandSectionContentDirective,
  ],
})
export class ClrCollapseExpandSectionModule {}
