/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnDestroy } from '@angular/core';
import { ClrBreadcrumbModel } from './breadcrumb-model.interface';
import { ClrBreadcrumbService } from './breadcrumb.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'clr-breadcrumb',
  templateUrl: './breadcrumb.html',
  standalone: false,
})
export class ClrBreadcrumb implements OnDestroy {
  /**
   * The array of breadcrumb elements to be displayed.
   */
  breadcrumbElements: ClrBreadcrumbModel[] = [];
  destroyed = new Subject<void>();

  constructor(private breadcrumbService: ClrBreadcrumbService) {
    this.breadcrumbService.breadcrumbChange.pipe(takeUntil(this.destroyed)).subscribe(r => {
      this.breadcrumbElements = r;
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
