/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClrActionPanel, ClrContentPanel, ClrHistoryModel, ClrHistoryService } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-basepage-layout-demo',
  templateUrl: './basepage-layout.demo.html',
  providers: [ClrHistoryService],
})
export class BasepageLayoutDemo implements OnInit {
  withCommandBar = false;
  withContentPanel = false;
  withActionPanel = false;
  withHistory = false;
  id: string;
  context = { ['applicationName']: 'ADDONS' };

  @ViewChild('contentPanelOffer')
  contentPanelOffer: ClrContentPanel;
  @ViewChild('contentPanelFinancing')
  contentPanelFinancing: ClrContentPanel;

  @ViewChild('actionPanel')
  actionPanel: ClrActionPanel;

  constructor(private router: Router, private historyService: ClrHistoryService) {}

  ngOnInit(): void {
    this.withCommandBar = this.collectRouteData('withCommand')[0];
    this.withContentPanel = this.collectRouteData('withPanel')[0];
    this.withActionPanel = this.collectRouteData('withActionPanel')[0];
    this.withHistory = this.collectRouteData('withHistory')[0];
    this.id = this.collectRouteData('id')[0];
    if (this.withHistory) {
      const historyEntry1: ClrHistoryModel = {
        username: 'admin',
        pageName: 'DocPage',
        url: 'https://porscheinformatik.github.io/clarity-addons/documentation/latest/get-started',
        title: 'DocPage',
        context: {
          applicationName: 'ADDONS',
          tenantid: '1',
        },
      };
      this.historyService.addHistoryEntry(historyEntry1, 'porscheinformatik.github.io');
      const historyEntry2: ClrHistoryModel = {
        username: 'admin',
        pageName: 'SourcePage',
        url: 'https://github.com/porscheinformatik/clarity-addons',
        title: 'SourcePage',
        context: {
          applicationName: 'ADDONS',
          tenantid: '1',
        },
      };
      this.historyService.addHistoryEntry(historyEntry2, 'porscheinformatik.github.io');
      const historyEntry3: ClrHistoryModel = {
        username: 'admin',
        pageName: 'GitHub',
        url: 'https://github.com/porscheinformatik/clarity-addons',
        title: 'GitHub',
        context: {
          applicationName: 'ADDONS',
          tenantid: '1',
        },
      };
      this.historyService.addHistoryEntry(historyEntry3, 'porscheinformatik.github.io');
      if (this.withActionPanel) {
        this.historyService.setHistoryPinned('admin', false, 'porscheinformatik.github.io');
      } else {
        this.historyService.setHistoryPinned('admin', true, 'porscheinformatik.github.io');
      }
    }
  }

  private togglePanel(toggleOffer: boolean) {
    if (toggleOffer) {
      if (this.contentPanelFinancing.isOpen()) {
        this.contentPanelFinancing.toggle();
      }
      this.contentPanelOffer.toggle();
    } else {
      if (this.contentPanelOffer.isOpen()) {
        this.contentPanelOffer.toggle();
      }
      this.contentPanelFinancing.toggle();
    }
  }

  toggleActionPanel() {
    this.actionPanel.toggle();
  }

  private collectRouteData(key: string) {
    let route = this.router.routerState.snapshot.root;
    const returnArray = [];

    while (route) {
      if (route.data && route.data[key]) {
        returnArray.push(route.data[key]);
      }
      route = route.firstChild;
    }
    return returnArray;
  }
}
