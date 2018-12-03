/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

import { TestContext } from '@clr/angular/data/datagrid/helpers.spec';

import { ClrCombobox } from './combobox';

@Component({
  template: `
        <clr-combobox>
          <clr-options>
            <clr-option [clrValue]="'Option 1'">
                Option 1
            </clr-option>
            <clr-option [clrValue]="'Option 2'">
                Option 2
            </clr-option>
          </clr-options>
        </clr-combobox>
    `,
})
class TestOptionSelection {}

export default function(): void {
  describe('Rendering Selected Option', () => {
    let context: TestContext<ClrCombobox<string>, TestOptionSelection>;

    beforeEach(function() {
      context = this.create(ClrCombobox, TestOptionSelection, [], []);
    });

    it('renders the selected option in the input when it is clicked', () => {
      const options = context.clarityElement.querySelectorAll('.clr-option');
      const input: HTMLElement = context.clarityElement.querySelector('.clr-combobox-input');

      expect(input.textContent).toBe('');

      options[0].click();

      expect(input.textContent).toMatch(/Option 1/);
    });

    it('clears the previous selection and renders the new selection in the input', () => {
      const options = context.clarityElement.querySelectorAll('.clr-option');
      const input: HTMLElement = context.clarityElement.querySelector('.clr-combobox-input');

      options[0].click();

      expect(input.textContent).toMatch(/Option 1/);

      options[1].click();

      expect(input.textContent).toMatch(/Option 2/);
    });
  });
}
