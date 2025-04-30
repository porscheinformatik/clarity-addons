/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import {
  ClarityIcons,
  errorStandardIcon,
  infoStandardIcon,
  minusIcon,
  plusIcon,
  successStandardIcon,
  warningStandardIcon,
} from '@cds/core/icon';

ClarityIcons.addIcons(
  errorStandardIcon,
  warningStandardIcon,
  successStandardIcon,
  infoStandardIcon,
  minusIcon,
  plusIcon
);

@Component({
  selector: 'clr-datagrid-highlight-demo',
  templateUrl: './datagrid-highlight.demo.html',
  standalone: false,
})
export class DatagridHighlightDemo {
  selected: unknown[] = [];

  dataHighlighting = [
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'success', text: 'Cell', status: 'success' },
    { name: 'error', text: 'Cell', status: 'error' },
    { name: 'warning', text: 'Cell', status: 'warning' },
    { name: 'info', text: 'Cell', status: 'info' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'disabled', text: 'Cell', status: 'Cell', disabled: true },
    { name: 'selected disabled', text: 'Cell', status: 'selected', disabled: true },
  ];

  getColoring(state: string) {
    switch (state) {
      case 'error':
        return 'datagrid-highlight-error';
      case 'success':
        return 'datagrid-highlight-success';
      case 'info':
        return 'datagrid-highlight-info';
      case 'warning':
        return 'datagrid-highlight-warning';
    }
    return '';
  }

  getTextColoring(state: string) {
    switch (state) {
      case 'error':
        return 'highlight-text-error';
      case 'success':
        return 'highlight-text-success';
      case 'info':
        return 'highlight-text-info';
      case 'warning':
        return 'highlight-text-warning';
    }
    return '';
  }

  getIcon(state: string) {
    switch (state) {
      case 'error':
        return 'error-standard';
      case 'success':
        return 'success-standard';
      case 'info':
        return 'info-standard';
      case 'warning':
        return 'warning-standard';
      default:
        return 'minus';
    }
  }
}
