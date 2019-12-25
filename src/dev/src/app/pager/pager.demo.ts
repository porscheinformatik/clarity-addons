/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-pager-demo',
  styleUrls: ['./pager.demo.scss'],
  templateUrl: './pager.demo.html',
})
export class PagerDemo {
  allItems: string[] = [
    'Nelson',
    'Graham',
    'Olene',
    'Dorian',
    'Nidia',
    'Keenan',
    'Luna',
    'Letisha',
    'Lenny',
    'Jeana',
    'Alica',
    'Sheridan',
    'Georgia',
    'Brad',
    'Ellen',
    'Brynn',
    'Roslyn',
    'Rhona',
    'Marcella',
    'Sibyl',
    'Shenika',
    'Desirae',
    'Beverly',
    'Johnson',
    'Kaitlin',
    'Lucius',
    'Darla',
    'Debby',
    'Lottie',
    'Genoveva',
  ];
  pageSize: number = 5;
  pagedItems: string[] = [];

  onPageChanged(page: any): void {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.allItems.length - 1);

    setTimeout(() => (this.pagedItems = this.allItems.slice(startIndex, endIndex + 1)), 0);
  }
}
