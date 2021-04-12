/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ɵbc as ControlIdService, ɵbi as MarkControlService } from '@clr/angular';

describe('AbstractFormComponent', () => {
  it('check correct obfuscated imports', () => {
    expect(new MarkControlService().constructor.name).toBe('MarkControlService');
    expect(new ControlIdService().constructor.name).toBe('ControlIdService');
  });
});
