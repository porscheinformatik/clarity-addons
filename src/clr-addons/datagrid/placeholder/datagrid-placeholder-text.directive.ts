/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, inject } from '@angular/core';
import { ClrCommonStringsService } from '@clr/angular';

/**
 * Shows the common string `datagridNoData` in an empty `clr-datagrid` that has no `clr-dg-placeholder` content.
 * Clarity's datagrid placeholder has no default text, so the text is passed to the placeholder styles.
 * Clarity does not define `datagridNoData` itself, so "No data available" is used unless the application localizes it.
 */
@Directive({
  selector: 'clr-datagrid',
  host: { '[style.--clr-addons-datagrid-placeholder-text]': 'cssValue()' },
})
export class ClrDatagridPlaceholderText {
  private readonly commonStrings = inject(ClrCommonStringsService).keys as { datagridNoData?: string };

  protected cssValue(): string | null {
    const text = this.commonStrings.datagridNoData || 'No data available';
    return text ? `"${text.replace(/[\\"]/g, '\\$&').replace(/\n/g, '\\a ')}"` : null;
  }
}
