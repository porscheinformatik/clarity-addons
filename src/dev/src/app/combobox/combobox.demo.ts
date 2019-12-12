/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MobileBehaviourMode } from '@porscheinformatik/clr-addons';

@Component({ templateUrl: './combobox.demo.html' })
export class ComboboxDemo {
  mobileBehaviourMode = MobileBehaviourMode;
  values$ = of(['Option 4', '<na> Option 5', 'Option 6 (test)', 'Option 7']).pipe(delay(500));

  mobileBehaviourModeRadioBox = MobileBehaviourMode.DEFAULT;
  userEntryAllowedRadioBox = false;
}
