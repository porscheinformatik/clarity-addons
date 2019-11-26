/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ForcedBehaviourMobile } from '../../../../clr-addons/combobox/utils/constants';

@Component({ templateUrl: './combobox.demo.html' })
export class ComboboxDemo {
  forcedBehaviourMobile = ForcedBehaviourMobile;
  values$ = of(['Option 4', '<na> Option 5', 'Option 6 (test)', 'Option 7']).pipe(delay(500));

  mobileOptions = {
    mobileBehaviour: ForcedBehaviourMobile.UNSET,
    userEntry: false,
  };
}
