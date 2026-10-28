/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ClarityModule } from '@clr/angular';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClrBreadcrumbService, ClrBreadcrumbModel, ClrBreadcrumb } from '@porscheinformatik/clr-addons';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<clr-breadcrumb></clr-breadcrumb>
`;

const ANGULAR_EXAMPLE = `
const breadcrumb1: ClrBreadcrumbModel = { label: "Home", url: "/" }
const breadcrumb2: ClrBreadcrumbModel = { label: "Parent", url: "/" }
const breadcrumb3: ClrBreadcrumbModel = { label: "Current Page" }
this.breadcrumbService.updateBreadcrumb([
    breadcrumb1, breadcrumb2, breadcrumb3
]);
`;

@Component({
  selector: 'clr-breadcrumb-demo',
  templateUrl: './breadcrumb.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  styles: [
    '.breadcrumb-demo > * { display: block; margin-top: -12px; }',
    '.breadcrumb-demo-long > * { margin-top: -12px; }',
    '.clrweb-DoxMedia-block { min-height: 60px; }',
  ],
  imports: [DocWrapper, ClrBreadcrumb, CodeSnippet, CommonModule, UtilsModule, DocWrapperModule, ClarityModule],
})
export class BreadcrumbDemo extends ClarityDocComponent implements OnInit {
  htmlExample = HTML_EXAMPLE;
  angularExample = ANGULAR_EXAMPLE;

  constructor(private breadcrumbService: ClrBreadcrumbService) {
    super('breadcrumb');
  }

  ngOnInit() {
    const breadcrumb1: ClrBreadcrumbModel = { label: 'Home', url: '/' };
    const breadcrumb2: ClrBreadcrumbModel = { label: 'Parent', url: '/' };
    const breadcrumb3: ClrBreadcrumbModel = { label: 'Current Page' };
    this.breadcrumbService.updateBreadcrumb([breadcrumb1, breadcrumb2, breadcrumb3]);
  }
}
