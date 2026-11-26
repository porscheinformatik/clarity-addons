/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClrCollapseExpandSection } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-collapse-expand-section-demo',
  templateUrl: './collapse-expand-section.demo.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ClrCollapseExpandSection],
})
export class CollapseExpandSectionDemo {}
