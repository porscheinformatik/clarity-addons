/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridModule } from '@clr/angular';
import { ClrDatagridPlaceholderText } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-datagrid-placeholder-demo',
  templateUrl: './datagrid-placeholder.demo.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ClrDatagridModule, ClrDatagridPlaceholderText],
})
export class DatagridPlaceholderDemo {}
