/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClrHistoryModel, ClrHistoryService } from '@porscheinformatik/clr-addons';

const HTML_EXAMPLE = `
<clr-history [clrUsername]="'admin'" [clrTenantId]="'1'"></clr-history>
`;

const HTML_EXAMPLE_PINNED = `
<clr-history-pinned [clrUsername]="'admin'" [clrTenantId]="'1'"></clr-history-pinned>
`;

const ANGULAR_EXAMPLE = `
const historyEntry1: ClrHistoryModel = {username: "admin", pageName: "DocPage",
url: "https://porscheinformatik.github.io/clarity-addons/documentation/latest/get-started", title: "DocPage",
tenantId: '1'};
this.historyService.addHistoryEntry(historyEntry1).subscribe();
const historyEntry2: ClrHistoryModel = {username: "admin", pageName: "SourcePage",
url: "https://porscheinformatik.github.io/clarity-addons/documentation/latest/get-started", title: "SourcePage",
tenantId: '1'};
this.historyService.addHistoryEntry(historyEntry2).subscribe();`;

@Component({
  selector: 'clr-history-demo',
  templateUrl: './history.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  providers: [ClrHistoryService],
  styles: ['.history-demo > * { display: block; margin-top: -12px; }', '.clrweb-DoxMedia-block { min-height: 60px; }'],
  standalone: false,
})
export class HistoryDemo extends ClarityDocComponent implements OnInit {
  htmlExample = HTML_EXAMPLE;
  htmlExamplePinned = HTML_EXAMPLE_PINNED;
  angularExample = ANGULAR_EXAMPLE;
  domain = 'porscheinformatik.github.io';

  constructor(private historyService: ClrHistoryService) {
    super('history');
  }

  ngOnInit() {
    this.historyService.setHistoryPinned('admin', true, this.domain);
    const historyEntry1: ClrHistoryModel = {
      username: 'admin',
      pageName: 'DocPage',
      url: 'https://porscheinformatik.github.io/clarity-addons/documentation/latest/get-started',
      title: 'DocPage',
      tenantId: '1',
    };
    this.historyService.addHistoryEntry(historyEntry1).subscribe();
    const historyEntry2: ClrHistoryModel = {
      username: 'admin',
      pageName: 'SourcePage',
      url: 'https://github.com/porscheinformatik/clarity-addons',
      title: 'SourcePage',
      tenantId: '1',
    };
    this.historyService.addHistoryEntry(historyEntry2).subscribe();
    const historyEntry3: ClrHistoryModel = {
      username: 'admin',
      pageName: 'GitHub',
      url: 'https://github.com/porscheinformatik/clarity-addons',
      title: 'GitHub',
      tenantId: '1',
    };
    this.historyService.addHistoryEntry(historyEntry3).subscribe();
  }
}
