/*
 * Copyright (c) 2016 - 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ScrollSpy } from '../../../utils/scrollspy.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HashListener } from '../../../utils/hash-listener.directive';

@Component({
  selector: 'clr-doc-wrapper',
  templateUrl: './doc-wrapper.html',
  host: {
    '[class.dox-wrapper]': 'true',
  },
  imports: [
    NgClass,
    ScrollSpy,
    RouterLink,
    RouterLinkActive,
    HashListener,
    CommonModule,
    ClarityModule,
    UtilsModule,
    RouterModule,
  ],
})
export class DocWrapper {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() deprecated = false;
  @Input() showTabs = true;
}
