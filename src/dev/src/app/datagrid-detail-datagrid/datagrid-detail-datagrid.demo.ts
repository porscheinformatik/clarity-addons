/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-datagrid-highlight-demo',
  templateUrl: './datagrid-detail-datagrid.demo.html',
  standalone: false,
})
export class DatagridDetailDatagridDemo {
  selected: unknown[] = [];
  selectedDetail: unknown[] = [];

  dataDatagrid = [
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
  ];
}
