/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { ClrGenericQuickListItem } from '@porscheinformatik/clr-addons';
import { of, Observable } from 'rxjs';

interface QuickListItem extends ClrGenericQuickListItem {
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-generic-quick-list-demo',
  templateUrl: './generic-quick-list.demo.html',
  standalone: false,
})
export class GenericQuickListDemo {
  allItems = [
    { id: 1, firstname: 'asdf', lastname: 'yxcv' } as QuickListItem,
    { id: 2, firstname: 'qwert', lastname: 'uipp' } as QuickListItem,
  ];

  allItemsV = [
    { id: 1, firstname: 'asdf', lastname: 'yxcv' } as QuickListItem,
    { id: 2, firstname: 'qwert', lastname: 'uipp' } as QuickListItem,
  ];

  itemRemoved(item: QuickListItem): void {
    console.log('item removed', item);
  }

  itemAdded(item: QuickListItem): void {
    console.log('item added', item);
  }

  addText(): Observable<string> {
    return of('cool');
  }
}
