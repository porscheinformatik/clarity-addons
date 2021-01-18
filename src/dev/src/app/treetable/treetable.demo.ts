/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'treetable-demo',
  templateUrl: './treetable.demo.html',
})
export class TreetableDemo {
  root = [
    {
      name: 'Parent1',
      type: 'Parent',
      version: 'V1',
      children: [
        {
          name: 'Child1',
          type: 'Child',
          version: 'V1',
          children: [{ name: 'ChildChild1', type: 'ChildChild', version: 'V1' }],
        },
        { name: 'Child2', type: 'Child', version: 'V1' },
      ],
    },
  ];
}
