/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { ClarityModule, ClrIcon, ClrIfOpen, ClrPopoverContent, ClrTooltipModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';

@Component({
  selector: 'clr-tooltip-demo',
  templateUrl: './tooltip.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrTooltipModule,
    ClrIcon,
    ClrIfOpen,
    ClrPopoverContent,
    CommonModule,
    FormsModule,
    ClarityModule,
    DocWrapperModule,
    UtilsModule,
  ],
})
export class TooltipDemo extends ClarityDocComponent {
  constructor() {
    super('tooltip');
  }
}
