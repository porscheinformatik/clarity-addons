/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export interface ClrQuickListValue<T> {
  id: string;
  label?: string;
  value: T;
}

export const CLR_BLANK_OPTION: ClrQuickListValue<any> = { id: '-BLANK-', label: '- Select an option -', value: null };
