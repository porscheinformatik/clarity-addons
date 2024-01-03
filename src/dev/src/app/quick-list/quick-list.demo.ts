/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrQuickListValue } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'app-quick-list-demo',
  templateUrl: './quick-list.demo.html',
})
export class QuickListDemo {
  options: Array<string> = [
    'First contact established',
    'Acquisition done',
    'Interested in new vehicle',
    'Vehicle presented',
    'Test drive done',
    'Offer handed out',
  ];

  BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select an option -', value: null };
  possibleActivityResults = this.options.map(op => this.map(op));
  selectedHActivityResults = this.possibleActivityResults.filter((_val, i) => i < 2);
  selectedVActivityResults: Array<ClrQuickListValue<string>> = [];

  form = new FormGroup({
    option: new FormControl(this.possibleActivityResults.filter((_val, i) => i < 1)),
  });

  private map(op: string): ClrQuickListValue<string> {
    return new (class implements ClrQuickListValue<string> {
      id = op.substr(0, 2);
      label = op;
      value = op;
    })();
  }

  getAddLabel(): string {
    return 'ADD OPTION';
  }
}
