/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityIcons, ClarityModule, factoryIcon } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { ClrIconAvatar } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<div class="parent">
    <clr-icon-avatar class="demo-avatar"></clr-icon-avatar>
    <span>John Doe</span>
</div>

.parent {
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`;

const HTML_EXAMPLE2 = `
<div class="parent">
    <clr-icon-avatar class="demo-avatar avatar-large" clrSize="48"></clr-icon-avatar>
    <span>John Doe</span>
</div>
`;

const HTML_EXAMPLE3 = `
<div class="parent">
    <clr-icon-avatar class="demo-avatar avatar-large" clrSize="48" clrShape="factory"></clr-icon-avatar>
    <span>Smith Inc.</span>
</div>
`;

const TYPESCRIPT1 = `

ClarityIcons.addIcons(factoryIcon);
`;

ClarityIcons.addIcons(factoryIcon);

@Component({
  selector: 'clr-icon-avatar-demo',
  templateUrl: './icon-avatar.demo.html',
  styleUrls: ['./icon-avatar.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrIconAvatar,
    CodeSnippet,
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class IconAvatarDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExample2 = HTML_EXAMPLE2;
  htmlExample3 = HTML_EXAMPLE3;
  tsExample1 = TYPESCRIPT1;

  constructor() {
    super('icon-avatar');
  }
}
