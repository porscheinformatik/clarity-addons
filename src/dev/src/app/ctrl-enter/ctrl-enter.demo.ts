/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrCommonFormsModule, ClrInputModule, ClarityModule } from '@clr/angular';
import {
  ClrAddonsModule,
  CLR_CONTROL_ENTER_SUBMIT_TRANSLATION,
  ClrControlEnterSubmitTranslationService,
} from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-ctrl-enter-demo',
  templateUrl: './ctrl-enter.demo.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ClrCommonFormsModule, ClrInputModule, ClarityModule, ClrAddonsModule],
  providers: [
    {
      provide: CLR_CONTROL_ENTER_SUBMIT_TRANSLATION,
      useValue: {
        translate: (key: string) => {
          if (key === 'CTRL_ENTER_SUBMIT') {
            return 'Ctrl+Enter to submit';
          }
          return key;
        },
      } as ClrControlEnterSubmitTranslationService,
    },
  ],
})
export class CtrlEnterDemo {
  name = '';
  submitted = false;
  lastSubmitTime = '';

  email = '';
  submitted2 = false;
  lastSubmitTime2 = '';

  onSubmit() {
    this.submitted = true;
    this.lastSubmitTime = new Date().toLocaleTimeString();
    // Reset submitted after 3 seconds to allow re-testing
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }

  onSubmit2() {
    this.submitted2 = true;
    this.lastSubmitTime2 = new Date().toLocaleTimeString();
    // Reset submitted after 3 seconds to allow re-testing
    setTimeout(() => {
      this.submitted2 = false;
    }, 3000);
  }
}
