/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import {
  ClarityIcons,
  calendarIcon,
  checkIcon,
  cogIcon,
  dashboardIcon,
  errorStandardIcon,
  fileIcon,
  folderIcon,
  homeIcon,
  imageIcon,
  infoCircleIcon,
  lineChartIcon,
  mapIcon,
  warningStandardIcon,
} from '@cds/core/icon';
import { ClrNotificationService } from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(
  homeIcon,
  cogIcon,
  warningStandardIcon,
  errorStandardIcon,
  checkIcon,
  infoCircleIcon,
  folderIcon,
  calendarIcon,
  lineChartIcon,
  dashboardIcon,
  mapIcon,
  fileIcon,
  imageIcon
);

@Component({
  selector: 'clr-colors-demo',
  templateUrl: './colors.demo.html',
  styleUrl: './colors.demo.scss',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ColorsDemo extends ClarityDocComponent {
  readonly rootDirectory: readonly any[] = [
    {
      name: 'Applications',
      icon: 'folder',
      expanded: true,
      files: [
        {
          icon: 'calendar',
          name: 'Calendar',
          active: true,
        },
        {
          icon: 'line-chart',
          name: 'Charts',
          active: false,
        },
        {
          icon: 'dashboard',
          name: 'Dashboard',
          active: false,
        },
        {
          icon: 'map',
          name: 'Maps',
          active: false,
        },
      ],
    },
    {
      name: 'Files',
      icon: 'folder',
      expanded: false,
      files: [
        {
          icon: 'file',
          name: 'Cover Letter.doc',
          active: false,
        },
      ],
    },
    {
      name: 'Images',
      icon: 'folder',
      expanded: false,
      files: [
        {
          icon: 'image',
          name: 'Screenshot.png',
          active: false,
        },
      ],
    },
  ];

  constructor() {
    super('colors');
  }

  async copyColorCode(event: Event, colorCode: string) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(colorCode);
      alert(`The variable ${colorCode} has been copied to your clipboard.`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}
