/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { ClrTreetable } from './treetable';
import { ClrTreetableModule } from './treetable.module';
import { ClrTreetableFilterInterface } from './interfaces/filter-model';
import { ClrTreetableComparatorInterface } from './interfaces/comparator.interface';
import { FilterStateService } from './providers/filter-state.service';
import { SortStateService } from './providers/sort-state.service';
import { ExportExcelCell, ExportExcelService, ExportType, ExportTypeEnum } from '../shared';
import { ExportTreetableButtonComponent } from './treetable-export-button.component';

type Item = { id: number; name: string; address: { city: string }; subItems?: Item[] };

const ITEMS: Item[] = [
  {
    id: 1,
    name: 'Parent',
    address: { city: 'Salzburg' },
    subItems: [{ id: 2, name: 'Child', address: { city: 'Wien' } }],
  },
  { id: 3, name: 'Other', address: { city: 'Graz' }, subItems: [] },
];

class ExportExcelServiceMock {
  filename: string | undefined;
  headers: ExportExcelCell[] | undefined;
  rows: ExportExcelCell[][] | undefined;
  callCount = 0;

  exportToExcel(filename: string, headers: ExportExcelCell[], rows: ExportExcelCell[][]): void {
    this.filename = filename;
    this.headers = headers;
    this.rows = rows;
    this.callCount++;
  }
}

/** Filter that only accepts items whose name contains the given search value. */
class NameFilter implements ClrTreetableFilterInterface<Item, string> {
  private readonly changesSubject = new Subject<string>();
  readonly changes = this.changesSubject.asObservable();
  private value = '';

  set(val: string) {
    this.value = val;
    this.changesSubject.next(val);
  }

  isActive(): boolean {
    return !!this.value.trim();
  }

  accepts(item: Item): boolean {
    return !this.isActive() || item.name.toLowerCase().includes(this.value.toLowerCase());
  }
}

class NameComparator implements ClrTreetableComparatorInterface<Item> {
  compare(a: Item, b: Item): number {
    return a.name.localeCompare(b.name);
  }
}

@Component({
  template: `
    <clr-export-treetable-button
      [treetable]="treetable()"
      [treetableRef]="treetableRef()"
      [isBackendExport]="isBackendExport()"
      [exportTypesToShow]="exportTypesToShow()"
      exportTitlePrefix="my-export"
      (backendExport)="lastBackendExport = $event"
    />

    <clr-treetable #treetableEl [(clrTtSelected)]="selected">
      <clr-tt-column clrTtField="name">
        <ng-container *clrTtHideableColumn="{ hidden: nameHidden() }">Name</ng-container>
      </clr-tt-column>
      <clr-tt-column clrTtField="id" clrTtColType="number">ID</clr-tt-column>
      <clr-tt-column clrTtField="address.city">City</clr-tt-column>
      <clr-tt-column clrTtField="id">Untyped ID</clr-tt-column>
      <clr-tt-column>No Field</clr-tt-column>

      <clr-tt-row
        *clrTtItems="let item of items(); getChildren: getSubItems; clrTtNode as node"
        [clrExpandable]="true"
        [clrTtItem]="node"
      >
        <clr-tt-cell>{{ item.name }}</clr-tt-cell>
        <clr-tt-cell>{{ item.id }}</clr-tt-cell>
        <clr-tt-cell>{{ item.address.city }}</clr-tt-cell>
        <clr-tt-cell>{{ item.id }}</clr-tt-cell>
        <clr-tt-cell>-</clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class TestHostComponent {
  readonly items = signal<Item[]>(ITEMS);
  readonly selected = signal<Item[]>([]);
  readonly isBackendExport = signal(false);
  readonly nameHidden = signal(false);
  readonly exportTypesToShow = signal<ExportType[] | undefined>(undefined);

  readonly treetable = viewChild(ClrTreetable);
  readonly treetableRef = viewChild('treetableEl', { read: ElementRef });

  lastBackendExport: ExportTypeEnum | undefined;

  getSubItems(item: Item): Item[] {
    return item.subItems ?? [];
  }
}

describe('ExportTreetableButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let button: ExportTreetableButtonComponent;
  let exportService: ExportExcelServiceMock;

  beforeEach(waitForAsync(() => {
    exportService = new ExportExcelServiceMock();

    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrTreetableModule],
      declarations: [TestHostComponent],
      providers: [{ provide: ExportExcelService, useValue: exportService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    button = fixture.debugElement.query(By.directive(ExportTreetableButtonComponent)).componentInstance;
  }));

  /** Activates a name filter on the treetable, leaving only the matching rows displayed. */
  function activateFilter(search: string): void {
    const treetableDebugEl = fixture.debugElement.query(By.directive(ClrTreetable));
    const filters = treetableDebugEl.injector.get(FilterStateService) as FilterStateService<Item>;
    const filter = new NameFilter();

    filters.register(filter);
    filter.set(search);
    fixture.detectChanges();
  }

  /** Sorts the treetable by name. */
  function sortByName(reverse = false): void {
    const treetableDebugEl = fixture.debugElement.query(By.directive(ClrTreetable));
    const sort = treetableDebugEl.injector.get(SortStateService) as SortStateService<Item>;

    sort.toggle(new NameComparator(), reverse);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(button).toBeTruthy();
  });

  describe('export types', () => {
    it('should only offer ALL when no filter is active and nothing is selected', () => {
      const types = button.exportTypesFiltered().map(type => type.type);
      expect(types).toEqual([ExportTypeEnum.ALL]);
    });

    it('should offer FILTERED as soon as a filter is active', () => {
      activateFilter('Other');

      const types = button.exportTypesFiltered().map(type => type.type);
      expect(types).toContain(ExportTypeEnum.FILTERED);
    });

    it('should offer SELECTED as soon as a row is selected', () => {
      host.selected.set([ITEMS[1]]);
      fixture.detectChanges();

      const types = button.exportTypesFiltered().map(type => type.type);
      expect(types).toContain(ExportTypeEnum.SELECTED);
    });

    it('should apply custom labels and restrict the offered types', () => {
      host.exportTypesToShow.set([{ type: ExportTypeEnum.ALL, value: 'Alle Einträge' }]);
      fixture.detectChanges();

      expect(button.exportTypesFiltered()).toEqual([{ type: ExportTypeEnum.ALL, value: 'Alle Einträge' }]);
    });
  });

  describe('export', () => {
    it('should export the rows depth first with the rendered column titles', () => {
      button.onExport(ExportTypeEnum.ALL);

      expect(exportService.filename).toBe('my-export');
      expect(exportService.headers.map(header => header.value)).toEqual(['Name', 'ID', 'City', 'Untyped ID']);
      expect(exportService.rows.map(row => row.map(cell => cell.value))).toEqual([
        ['Parent', '1', 'Salzburg', '1'],
        ['Child', '2', 'Wien', '2'],
        ['Other', '3', 'Graz', '3'],
      ]);
    });

    it('should ignore active filters for ALL but respect them for FILTERED', () => {
      activateFilter('Other');

      button.onExport(ExportTypeEnum.ALL);
      expect(exportService.rows.map(row => row[0].value)).toEqual(['Parent', 'Child', 'Other']);

      button.onExport(ExportTypeEnum.FILTERED);
      expect(exportService.rows.map(row => row[0].value)).toEqual(['Other']);
    });

    it('should respect the active sort for ALL', () => {
      sortByName();

      button.onExport(ExportTypeEnum.ALL);

      expect(exportService.rows.map(row => row[0].value)).toEqual(['Other', 'Parent', 'Child']);
    });

    it('should exclude columns without clrTtField', () => {
      button.onExport(ExportTypeEnum.ALL);

      expect(exportService.headers.map(header => header.value)).not.toContain('No Field');
      expect(exportService.headers.length).toBe(exportService.rows[0].length);
    });

    it('should take the cell type from clrTtColType and default to string', () => {
      button.onExport(ExportTypeEnum.ALL);

      // Name, ID (number), City, Untyped ID (numeric value but no clrTtColType)
      expect(exportService.rows[0].map(cell => cell.type)).toEqual(['string', 'number', 'string', 'string']);
    });

    it('should skip hidden columns', () => {
      host.nameHidden.set(true);
      fixture.detectChanges();

      button.onExport(ExportTypeEnum.ALL);

      expect(exportService.headers.map(header => header.value)).toEqual(['ID', 'City', 'Untyped ID']);
      expect(exportService.rows[0].map(cell => cell.value)).toEqual(['1', 'Salzburg', '1']);
    });

    it('should export only the selected rows', () => {
      host.selected.set([ITEMS[1]]);
      fixture.detectChanges();

      button.onExport(ExportTypeEnum.SELECTED);

      expect(exportService.rows.map(row => row[0].value)).toEqual(['Other']);
    });

    it('should emit backendExport instead of writing a file', () => {
      host.isBackendExport.set(true);
      fixture.detectChanges();

      button.onExport(ExportTypeEnum.ALL);

      expect(host.lastBackendExport).toBe(ExportTypeEnum.ALL);
      expect(exportService.callCount).toBe(0);
    });
  });
});
