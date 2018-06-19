/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-paged-search-result-list-demo',
  styleUrls: ['./paged-search-result-list.demo.scss'],
  templateUrl: './paged-search-result-list.demo.html',
})
export class PagedSearchResultListDemo {
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
  currentPage: number = 1;

  onPageChanged(page: any): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.allItems.length - 1);

    setTimeout(() => (this.pagedItems = this.allItems.slice(startIndex, endIndex + 1)), 0);
  }
}
