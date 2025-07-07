/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrTreetable, ClrTreetableModule, ClrTreetableRow } from '@porscheinformatik/clr-addons';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { SelectionType } from './enums/selection-type';

type Item = { id: number };

@Component({
  template: `
    <clr-treetable [clrClickableRows]="false">
      <clr-tt-row>
        <clr-tt-cell>1</clr-tt-cell>

        <clr-tt-row>
          <clr-tt-cell>2</clr-tt-cell>
        </clr-tt-row>
      </clr-tt-row>

      <clr-tt-row>
        <clr-tt-cell>3</clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class RowClickableTestComponent {
  @ViewChild(ClrTreetable, { static: true }) treetable: ClrTreetable<Item>;
  @ViewChildren(ClrTreetableRow) ttRows: QueryList<ClrTreetableRow<Item>>;
}

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row>
        <clr-tt-action-overflow>
          <button class="action-item">Test</button>
        </clr-tt-action-overflow>
        <clr-tt-cell>1</clr-tt-cell>

        <clr-tt-row>
          <clr-tt-cell>2</clr-tt-cell>
        </clr-tt-row>
      </clr-tt-row>

      <clr-tt-row>
        <clr-tt-cell>3</clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class ActionTestComponent {}

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
  @ViewChild(ClrTreetable, { static: true }) treetable: ClrTreetable<Item>;

  allItems: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  selected: Item[] = [];
}

@Component({
  template: ` <clr-treetable> </clr-treetable> `,
  standalone: false,
})
class EmptyTestComponent {
  @ViewChild(ClrTreetable, { static: true }) treetable: ClrTreetable<Item>;
}

describe('ClrTreetable', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;
  let actionTestComponentFixture: ComponentFixture<ActionTestComponent>;

  let selectableTestComponentFixture: ComponentFixture<SelectableTestComponent>;
  let selectableTestComponent: SelectableTestComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent, RowClickableTestComponent, ActionTestComponent, SelectableTestComponent],
      imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    rowClickableTestComponentFixture = TestBed.createComponent(RowClickableTestComponent);
    rowClickableTestComponent = rowClickableTestComponentFixture.componentInstance;
    rowClickableTestComponentFixture.detectChanges();

    emptyTestComponentFixture = TestBed.createComponent(EmptyTestComponent);
    emptyTestComponent = emptyTestComponentFixture.componentInstance;
    emptyTestComponentFixture.detectChanges();

    actionTestComponentFixture = TestBed.createComponent(ActionTestComponent);
    actionTestComponentFixture.detectChanges();

    selectableTestComponentFixture = TestBed.createComponent(SelectableTestComponent);
    selectableTestComponent = selectableTestComponentFixture.componentInstance;
    selectableTestComponentFixture.detectChanges();
  });

  it('should create', () => {
    expect(emptyTestComponent).toBeTruthy();
  });

  it('should be empty if there are no rows', () => {
    expect(emptyTestComponent.treetable.empty).toBeTruthy();
    expect(emptyTestComponent.treetable.selection.selectionType).toBe(SelectionType.None);
    expect(rowClickableTestComponent.treetable.empty).toBeFalsy();
  });

  it('should not have any clickable rows', () => {
    const noOfClickableRows = rowClickableTestComponent.ttRows.filter(ttRow => ttRow.clickable).length;
    expect(noOfClickableRows).toBe(0);
  });

  it('should not have action column', () => {
    const noOfClickableRows = rowClickableTestComponentFixture.debugElement.queryAll(
      By.css('.treetable-row-actions')
    ).length;
    expect(noOfClickableRows).toBe(0);
  });

  it('should have action column', () => {
    actionTestComponentFixture.detectChanges();
    const noOfActionCellsWHeader = actionTestComponentFixture.debugElement.queryAll(
      By.css('.treetable-row-actions')
    ).length;
    expect(noOfActionCellsWHeader).toBe(2);

    const noOfActionButtons = actionTestComponentFixture.debugElement.queryAll(
      By.css('.treetable-action-trigger')
    ).length;
    expect(noOfActionButtons).toBe(1);
  });

  it('should selection column', () => {
    const selectableRowsWithHeader = selectableTestComponentFixture.debugElement.queryAll(
      By.css('.treetable-row-selection')
    ).length;

    expect(selectableRowsWithHeader).toBe(4); // 3 rows + header row
  });

  it('should emit selected changed', fakeAsync(() => {
    const spy = jasmine.createSpy('selectedChangedSpy');
    selectableTestComponent.treetable.selectedChanged.subscribe(spy);

    selectableTestComponent.treetable.allSelected = true;

    tick();

    expect(spy).toHaveBeenCalledWith(selectableTestComponent.allItems);
  }));
});
