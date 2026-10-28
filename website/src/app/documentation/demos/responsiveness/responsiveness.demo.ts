/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityModule, ClrCommonFormsModule, ClrDatagridModule, ClrFormsModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { CodeSnippet } from '../../../utils/code-snippet';
import { ClrViewEditSection, ClrAddonsLabel } from '@porscheinformatik/clr-addons';
import { FormsModule } from '@angular/forms';

const CODE_EXAMPLE = `
<clr-datagrid class="clr-max-width">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row clrDgItem="1">
        <clr-dg-cell>Item 1</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="2">
        <clr-dg-cell>Item 2</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="3">
        <clr-dg-cell>Item 3</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="4">
        <clr-dg-cell>Item 4</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="5">
        <clr-dg-cell>Item 5</clr-dg-cell>
    </clr-dg-row>
</clr-datagrid>
`;

@Component({
  selector: 'clr-responsiveness-demo',
  templateUrl: './responsiveness.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrDatagridModule,
    CodeSnippet,
    ClrViewEditSection,
    FormsModule,
    ClrCommonFormsModule,
    ClrAddonsLabel,
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class ResponsivenessDemo extends ClarityDocComponent {
  codeExample = CODE_EXAMPLE;
  constructor() {
    super('responsiveness');
  }
}
