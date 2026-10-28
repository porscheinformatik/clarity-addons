/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule, ClrCommonFormsModule, ClrInputModule } from '@clr/angular';
import { ClrControlEnterSubmitDirective, ClrAddonsLabel, ClrAutocompleteOff } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-ctrl-enter-demo',
  templateUrl: './ctrl-enter.demo.html',
  providers: [],
  imports: [
    FormsModule,
    ClrControlEnterSubmitDirective,
    ClrCommonFormsModule,
    ClrInputModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
    ClrAlertModule,
  ],
})
export class CtrlEnterDemo {
  name = '';
  submitted = false;
  lastSubmitTime = '';

  email = '';
  submitted2 = false;
  lastSubmitTime2 = '';

  group1 = '';
  group2 = '';
  submittedGroups = [false, false];
  lastSubmitTimesGroups = ['', ''];

  onSubmit() {
    this.submitted = true;
    this.lastSubmitTime = new Date().toLocaleTimeString();
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }

  onSubmit2() {
    this.submitted2 = true;
    this.lastSubmitTime2 = new Date().toLocaleTimeString();
    setTimeout(() => {
      this.submitted2 = false;
    }, 3000);
  }

  onSubmitGroup(idx: number) {
    this.submittedGroups[idx] = true;
    this.lastSubmitTimesGroups[idx] = new Date().toLocaleTimeString();
    setTimeout(() => {
      this.submittedGroups[idx] = false;
    }, 3000);
  }
}
