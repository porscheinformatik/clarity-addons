/*
 * Copyright (c) 2016 - 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'clr-doc-wrapper',
  templateUrl: './doc-wrapper.html',
  host: {
    '[class.dox-wrapper]': 'true',
  },
})
export class DocWrapper {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() deprecated = false;
}
