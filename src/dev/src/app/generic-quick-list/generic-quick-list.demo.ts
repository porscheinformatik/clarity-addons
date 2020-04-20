/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-generic-quick-list-demo',
  templateUrl: './generic-quick-list.demo.html',
})
export class GenericQuickListDemo {
  allItems = [
    { id: 1, firstname: 'asdf', lastname: 'yxcv' },
    { id: 2, firstname: 'qwert', lastname: 'uipp' },
  ];

  allItemsV = [
    { id: 1, firstname: 'asdf', lastname: 'yxcv' },
    { id: 2, firstname: 'qwert', lastname: 'uipp' },
  ];

  itemRemoved(itemId: any): void {
    console.log('item removed', itemId);
  }

  itemAdded(item: any): void {
    console.log('item added', item);
  }

  addText(): Observable<string> {
    return of('cool');
  }
}
