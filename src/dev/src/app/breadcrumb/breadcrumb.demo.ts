/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'clr-breadcrumb-demo',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <h2>Breadcrumb</h2>
    You can see the breadcrumb component above the title.
  `,
})
export class BreadcrumbDemo {}
