/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClarityIcons, infoCircleIcon } from '@clr/angular/icon';

describe('Icon Registration patch', () => {
  it('should register an icon only once', () => {
    let stateUpdates = 0;
    document.addEventListener('CDS_STATE_UPDATE', () => stateUpdates++);

    ClarityIcons.addIcons(infoCircleIcon);
    expect(stateUpdates).toBe(1);

    ClarityIcons.addIcons(infoCircleIcon);
    expect(stateUpdates).toBe(1);
  });
});
