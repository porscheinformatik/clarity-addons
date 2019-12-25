/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClrBreadcrumbModel } from './breadcrumb-model.interface';

@Injectable({
  providedIn: 'root',
})
export class ClrBreadcrumbService {
  breadcrumbChange: Subject<ClrBreadcrumbModel[]> = new Subject();

  updateBreadcrumb(breadcrumbElements: ClrBreadcrumbModel[]) {
    this.breadcrumbChange.next(breadcrumbElements);
  }
}
