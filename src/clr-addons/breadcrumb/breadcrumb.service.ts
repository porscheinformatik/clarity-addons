/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BreadcrumbModel } from './breadcrumb-model.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbChange: Subject<BreadcrumbModel[]> = new Subject();

  breadcrumbUpdate(breadcrumbElements: BreadcrumbModel[]) {
    this.breadcrumbChange.next(breadcrumbElements);
  }
}
