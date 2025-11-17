/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { computed, Injectable, Optional, signal, SkipSelf, TemplateRef } from '@angular/core';
import { ClrTreetableItemsContext } from '../treetable-items';

@Injectable()
export class ClrTreetableRecursionService<T extends object> {
  private readonly _template = signal<TemplateRef<ClrTreetableItemsContext<T>>>(null);
  readonly recursionTemplate = computed(() => this._template());
  readonly isRecursionMode = computed(() => !!this._template());

  setTemplate(newTemplate: TemplateRef<ClrTreetableItemsContext<T>> | null) {
    this._template.set(newTemplate);
  }
}

export function treetableRecursionServiceFactory<T extends object>(
  existing: ClrTreetableRecursionService<T>
): ClrTreetableRecursionService<T> {
  return existing || new ClrTreetableRecursionService<T>();
}

export const TREETABLE_RECURSION_SERVICE_PROVIDER = {
  provide: ClrTreetableRecursionService,
  useFactory: treetableRecursionServiceFactory,
  deps: [[new Optional(), new SkipSelf(), ClrTreetableRecursionService]],
};
