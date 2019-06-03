/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Inject } from '@angular/core';

import { ɵk as IF_ACTIVE_ID, ɵm as IF_ACTIVE_ID_PROVIDER, ɵn as IfActiveService } from '@clr/angular';

@Component({
  selector: 'clr-view-edit-section-block',
  template: `
    <ng-content></ng-content>
  `,
  providers: [IF_ACTIVE_ID_PROVIDER],
})
export class ClrViewEditSectionBlock {
  constructor(public ifActiveService: IfActiveService, @Inject(IF_ACTIVE_ID) public id: number) {}

  get active() {
    return this.ifActiveService.current === this.id;
  }

  activate() {
    this.ifActiveService.current = this.id;
  }
}
