/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbModel } from './breadcrumb-model.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss'],
})
export class ClrBreadcrumb implements OnInit {
  /**
   * The array of breadcrumb elements to be displayed.
   */
  @Input('clrBreadcrumbElements') breadcrumbElements: BreadcrumbModel[] = [];

  constructor() {}

  ngOnInit() {}
}
