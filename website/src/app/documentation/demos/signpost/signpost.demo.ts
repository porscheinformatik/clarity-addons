/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
<clr-tt-cell class="text-truncate">{{ node.name }}
  <cng-signpost [targetAnchor]="'.treetable-grid'" position="'right-bottom'">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque dapibus orci vitae bibendum.</cng-signpost>
</clr-tt-cell>`;

@Component({
  selector: 'cng-signpost-demo',
  templateUrl: './signpost.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class SignpostDemo extends ClarityDocComponent implements OnInit {
  htmlExample = HTML_EXAMPLE;
  root = [] as any[];

  constructor() {
    super('signpost');
  }

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
                children: [
                  {
                    name: 'ChildChild1',
                    type: 'ChildChild',
                    version: 'V1',
                    children: [{ name: 'ChildChildChild1', type: 'ChildChildChild', version: 'V1' }],
                  },
                ],
              },
              { name: 'Child2', type: 'Child', version: 'V1' },
            ],
          },
        ])
    );
  }
}
