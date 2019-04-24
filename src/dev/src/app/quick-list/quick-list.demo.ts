/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { ClrQuickListValue } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'app-quick-list-demo',
  templateUrl: './quick-list.demo.html',
})
export class QuickListDemo implements OnInit {
  BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select an option -', value: null };
  selectedActivityResults: Array<ClrQuickListValue<string>> = [];
  possibleActivityResults: Array<ClrQuickListValue<string>> = [];
  options: Array<string> = [
    'First contact established',
    'Acquisition done',
    'Interested in new vehicle',
    'Vehicle presented',
    'Test drive done',
    'Offer handed out',
  ];

  ngOnInit() {
    this.selectedActivityResults = [this.BLANK_OPTION];
    this.possibleActivityResults = this.options.map(op => this.map(op));
  }

  private map(op: string): ClrQuickListValue<string> {
    return new class implements ClrQuickListValue<string> {
      id = op.substr(0, 2);
      label = op;
      value = op;
    }();
  }

  getAddLabel(): string {
    return 'ADD OPTION';
  }
}
