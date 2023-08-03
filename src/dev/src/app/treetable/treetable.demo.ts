/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { ClarityIcons, infoStandardIcon } from '@cds/core/icon';

ClarityIcons.addIcons(infoStandardIcon);

@Component({
  selector: 'treetable-demo',
  templateUrl: './treetable.demo.html',
})
export class TreetableDemo implements OnInit {
  root = [] as any[];
  veryLongString =
    ' This is a very long string which should show that text will be truncated properly and not overflow its parent';

  ngOnInit(): void {
    setTimeout(
      () =>
        (this.root = [
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
        ])
    );
  }
}
