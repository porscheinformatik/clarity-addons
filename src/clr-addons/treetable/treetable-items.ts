/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, effect, inject, input, TemplateRef } from '@angular/core';
import { TreetableDataStateService } from './providers';
import { ClrTreetableChildrenFunction, ClrTreetableTreeNode } from './interfaces/treetable-model';
import { ClrTreetableRecursionService } from './providers/treetable-recursion.service';

/**
 * Context passed to a TreeTable item template.
 *
 * $implicit: The current data item.<br/>
 * isLeaf: True if the node has no children.<br/>
 * clrTtNode: Internal tree node metadata object.<br/>
 */
export type ClrTreetableItemsContext<T extends object> = {
  $implicit: T;
  isLeaf: boolean;
  clrTtNode: ClrTreetableTreeNode<T>;
};

@Directive({
  selector: '[clrTtItems][clrTtItemsOf]',
  standalone: false,
})
export class TreetableItemsDirective<T extends object> {
  private readonly _dataStateService = inject(TreetableDataStateService<T>);
  private readonly _recursionService = inject(ClrTreetableRecursionService<T>);
  private readonly _templateRef = inject(TemplateRef<ClrTreetableItemsContext<T>>);

  readonly clrTtItemsOf = input.required<Array<T>>();
  readonly clrTtItemsGetChildren = input.required<ClrTreetableChildrenFunction<T>>();

  constructor() {
    if (this._templateRef) {
      this._recursionService.setTemplate(this._templateRef);
    }

    effect(() => {
      const items = this.clrTtItemsOf();
      const getChildren = this.clrTtItemsGetChildren();
      if (items) {
        this._dataStateService.setDataSource(items, getChildren);
      }
    });
  }

  static ngTemplateContextGuard<C extends object>(
    // @ts-expect-error This is a valid Angular context guard.
    dir: TreetableItemsDirective<C>,
    // @ts-expect-error This is a valid Angular context guard.
    ctx: any
  ): ctx is ClrTreetableItemsContext<C> {
    return true;
  }
}
