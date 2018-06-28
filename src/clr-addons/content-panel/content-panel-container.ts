/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'content-panel-container',
  template:
    '<div class="content-panel-outer-wrapper">' +
    '<div class="content-panel-outer-content">' +
    '<ng-content select=":not(clr-content-panel)"></ng-content>' +
    '</div>' +
    '<ng-content select="clr-content-panel"></ng-content>' +
    '</div>',
})
export class ClrContentPanelContainer {}
