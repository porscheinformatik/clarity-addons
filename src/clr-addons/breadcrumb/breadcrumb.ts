/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input } from '@angular/core';
import { BreadcrumbModel } from './breadcrumb-model.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'clr-breadcrumb',
  templateUrl: './breadcrumb.html',
})
export class ClrBreadcrumb {
  /**
   * The array of breadcrumb elements to be displayed.
   */
  @Input('clrBreadcrumbElements') breadcrumbElements: BreadcrumbModel[] = [];
}
