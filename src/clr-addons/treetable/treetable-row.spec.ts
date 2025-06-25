/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrTreetableModule, ClrTreetableRow, Items, Selection, Sort } from '@porscheinformatik/clr-addons';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectionType } from './enums/selection-type';

type Item = { id: number };

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row [clrExpandable]="true">
        <clr-tt-cell></clr-tt-cell>

        <clr-tt-row>
          <clr-tt-cell></clr-tt-cell>
        </clr-tt-row>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class RowClickableTestComponent {
  @ViewChild(ClrTreetableRow, { static: true }) ttRow: ClrTreetableRow<Item>;
}

@Component({
  template: `
    <clr-treetable [(clrTtSelected)]="selected">
      <clr-tt-row *clrTtItems="allItems; let item" [clrTtItem]="item">
        <clr-tt-cell></clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class SelectableTestComponent {
  @ViewChildren(ClrTreetableRow) ttRows: QueryList<ClrTreetableRow<Item>>;

  allItems: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  selected: Item[] = [this.allItems[0]];
}

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row> </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class EmptyTestComponent {
  @ViewChild(ClrTreetableRow, { static: true }) ttRow: ClrTreetableRow<Item>;
}

describe('ClrTreetableRow', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;
  let selectableTestComponent: SelectableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;
  let selectableTestComponentFixture: ComponentFixture<SelectableTestComponent>;

  let selection: Selection<Item>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent, RowClickableTestComponent, SelectableTestComponent],
      imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
      providers: [Selection, Items, Sort],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    rowClickableTestComponentFixture = TestBed.createComponent(RowClickableTestComponent);
    rowClickableTestComponent = rowClickableTestComponentFixture.componentInstance;
    rowClickableTestComponentFixture.detectChanges();

    emptyTestComponentFixture = TestBed.createComponent(EmptyTestComponent);
    emptyTestComponent = emptyTestComponentFixture.componentInstance;
    emptyTestComponentFixture.detectChanges();

    selectableTestComponentFixture = TestBed.createComponent(SelectableTestComponent);
    selectableTestComponent = selectableTestComponentFixture.componentInstance;
    selectableTestComponentFixture.detectChanges();
    selection = TestBed.inject(Selection);
  }));

  it('should create', () => {
    expect(emptyTestComponent).toBeTruthy();
  });

  it('should expand if clicked', () => {
    expect(rowClickableTestComponent.ttRow.expanded).toBeFalsy();
    const row = rowClickableTestComponentFixture.debugElement.query(By.css('.treetable-row:first-of-type'));
    row.triggerEventHandler('click', { target: row.nativeElement });
    rowClickableTestComponentFixture.detectChanges();
    expect(rowClickableTestComponent.ttRow.expanded).toBeTruthy();
  });

  it('should preselect given item', () => {
    selection.selectionType = SelectionType.Multi;

    const rows = selectableTestComponent.ttRows.toArray();

    expect(rows[0].selected).toBe(true);
    expect(rows[1].selected).toBe(false);
    expect(rows[2].selected).toBe(false);
  });

  it('should toggle selection for a row', () => {
    selection.selectionType = SelectionType.Multi;

    const firstRow = selectableTestComponent.ttRows.toArray()[0];
    const selectedChangedSpy = spyOn(firstRow.selectedChanged, 'emit');

    firstRow.toggle();
    expect(firstRow.selected).toBe(false);
    expect(selectedChangedSpy).toHaveBeenCalledWith(false);

    firstRow.toggle();
    expect(firstRow.selected).toBe(true);
    expect(selectedChangedSpy).toHaveBeenCalledWith(true);
  });
});
