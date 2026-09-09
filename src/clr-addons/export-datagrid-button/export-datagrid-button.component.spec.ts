/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrDatagrid } from '@clr/angular';

import { ExportDatagridButtonComponent } from './export-datagrid-button.component';
import { ExportDatagridService } from './export-datagrid.service';
import { ExportTypeEnum } from '../shared';

type Item = { id: number; name: string; address: { city: string } };

const ITEMS: Item[] = [
  { id: 1, name: 'Alpha', address: { city: 'Salzburg' } },
  { id: 2, name: 'Beta', address: { city: 'Wien' } },
];

class ExportDatagridServiceMock {
  headers: { value: string; type: string }[] | undefined;
  rows: { value: string; type: any }[][] | undefined;

  exportToExcel(_filename: string, headers: any[], rows: any[][]): void {
    this.headers = headers;
    this.rows = rows;
  }
}

@Component({
  template: `
    <clr-export-datagrid-button [datagrid]="datagrid()" [datagridRef]="datagridRef()" />

    <clr-datagrid #datagridEl [(clrDgSelected)]="selected" clrDgSelectionType="multi">
      <clr-dg-column [clrDgField]="'name'">Name</clr-dg-column>
      <clr-dg-column [clrDgField]="'address.city'">City</clr-dg-column>
      <clr-dg-column>No Field</clr-dg-column>

      <clr-dg-row *clrDgItems="let item of items()" [clrDgItem]="item">
        <clr-dg-cell>{{ item.name }}</clr-dg-cell>
        <clr-dg-cell>{{ item.address.city }}</clr-dg-cell>
        <clr-dg-cell>-</clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
  standalone: false,
})
class TestHostComponent {
  readonly items = signal<Item[]>(ITEMS);
  readonly selected = signal<Item[]>([]);

  readonly datagrid = viewChild<ClrDatagrid<Item>>('datagridEl');
  readonly datagridRef = viewChild('datagridEl', { read: ElementRef });
}

describe('ExportDatagridButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let button: ExportDatagridButtonComponent;
  let exportService: ExportDatagridServiceMock;

  beforeEach(waitForAsync(() => {
    exportService = new ExportDatagridServiceMock();

    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ExportDatagridButtonComponent],
      declarations: [TestHostComponent],
      providers: [{ provide: ExportDatagridService, useValue: exportService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    button = fixture.debugElement.query(By.directive(ExportDatagridButtonComponent)).componentInstance;
  }));

  it('should resolve flat and nested clrDgField values', () => {
    button.onExport(ExportTypeEnum.ALL);

    const values = exportService.rows.map(row => row.map(cell => cell.value));
    expect(values).toEqual([
      ['Alpha', 'Salzburg', ''],
      ['Beta', 'Wien', ''],
    ]);
  });

  it('should export an empty value for columns without clrDgField', () => {
    button.onExport(ExportTypeEnum.ALL);

    expect(exportService.rows.every(row => row[2].value === '')).toBeTrue();
  });
});
