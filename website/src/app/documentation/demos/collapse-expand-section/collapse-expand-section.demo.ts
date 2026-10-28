/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { ClrCollapseExpandSection } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<clr-collapse-expand-section [clrIsCollapsed]="isCollapsed"
                             (clrCollapsed)="onCollapsed()"
                             (clrExpanded)="onExpanded()">
    <ng-container clr-ces-title>Title</ng-container>
    <ng-container clr-ces-content>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet.
    </ng-container>
</clr-collapse-expand-section>         
`;

@Component({
  selector: 'clr-collapse-expand-section-demo',
  templateUrl: 'collapse-expand-section.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrCollapseExpandSection,
    CodeSnippet,
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class CollapseExpandSectionDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;

  isCollapsed: boolean = false;

  onCollapsed() {
    console.log('Section collapsed!');
  }

  onExpanded() {
    console.log('Section expanded!');
  }

  constructor() {
    super('collapse-expand-section');
  }
}
