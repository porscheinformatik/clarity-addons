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
import { ClrBrandAvatar } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<div class="parent">
    <clr-brand-avatar class="demo-avatar" [clrBrand]="'Volkswagen'"></clr-brand-avatar>
    <a href="#">Volkswagen</a>
</div>

.parent {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`;

const HTML_EXAMPLE_LARGER = `
<div class="parent">
    <clr-brand-avatar class="demo-avatar" [clrSize]="48" [clrBrand]="'Volkswagen'"></clr-brand-avatar>
    <a href="#">Volkswagen</a>
</div>

.parent {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`;

const HTML_EXAMPLE2 = `
<div class="parent">
    <clr-brand-avatar class="demo-avatar"></clr-brand-avatar>
    <a href="#">No brand set</a>
</div>
`;

@Component({
  selector: 'clr-brand-avatar-demo',
  templateUrl: './brand-avatar.demo.html',
  styleUrls: ['./brand-avatar.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrBrandAvatar,
    CodeSnippet,
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class BrandAvatarDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExampleLarger = HTML_EXAMPLE_LARGER;
  htmlExample2 = HTML_EXAMPLE2;

  constructor() {
    super('brand-avatar');
  }
}
