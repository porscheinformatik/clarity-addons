/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { ClarityIcons, infoStandardIcon } from '@cds/core/icon';
import { of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';

ClarityIcons.addIcons(infoStandardIcon);

@Component({
  selector: 'treetable-demo',
  templateUrl: './treetable.demo.html',
})
export class TreetableDemo implements OnInit {
  root = [] as any[];
  veryLongString =
    ' This is a very long string which should show that text will be truncated properly and not overflow its parent';

  data$ = of(
    [...Array(30).keys()].map(() => ({
      col1: 'Vehicle configuration',
      col2: '',
      col3: '18,519.99EUR',
      col4: '20%',
      col5: '19.99EUR',
      col6: '519.99EUR',
      child: [
        {
          col1: 'Audi A1 3-Türer Attraction 1.2 TFSI 63(86) kW(PS) 5-Gang',
          col2: 'EUR 16,750.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Florettsilber Metallic Brillantschwarz / granatrot-schwarz-granatrot / schwarz- schwarz / schwarz / titangrau',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
      ],
      extras: [
        {
          col1: 'Extra1',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Extra2',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Extra3',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Extra4',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
      ],
    }))
  ).pipe(
    delay(500),
    tap(() => (this.total = 100))
  );

  total = 0;

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

  isExpandable(node: any): boolean {
    let expandable = false;
    node.child?.forEach((child: any) => {
      if (child) {
        expandable = true;
      }
    });
    return expandable;
  }
}
