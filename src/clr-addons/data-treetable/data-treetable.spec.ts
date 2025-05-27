/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrDataTreeTable, ClrDataTreeTableModule, ClrDataTreeTableRow } from '@porscheinformatik/clr-addons';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <clr-data-treetable [clrClickableRows]="false">
      <clr-dt-row>
        <clr-dt-cell>1</clr-dt-cell>

        <clr-dt-row>
          <clr-dt-cell>2</clr-dt-cell>
        </clr-dt-row>
      </clr-dt-row>

      <clr-dt-row>
        <clr-dt-cell>3</clr-dt-cell>
      </clr-dt-row>
    </clr-data-treetable>
  `,
  standalone: false,
})
class RowClickableTestComponent {
  @ViewChild(ClrDataTreeTable, { static: true }) dataTreetable: ClrDataTreeTable;
  @ViewChildren(ClrDataTreeTableRow) ttRows: QueryList<ClrDataTreeTableRow>;
}

@Component({
  template: `
    <clr-data-treetable>
      <clr-dt-row>
        <clr-dt-action-overflow>
          <button class="action-item">Test</button>
        </clr-dt-action-overflow>
        <clr-dt-cell>1</clr-dt-cell>

        <clr-dt-row>
          <clr-dt-cell>2</clr-dt-cell>
        </clr-dt-row>
      </clr-dt-row>

      <clr-dt-row>
        <clr-dt-cell>3</clr-dt-cell>
      </clr-dt-row>
    </clr-data-treetable>
  `,
  standalone: false,
})
class ActionTestComponent {}

@Component({
  template: ` <clr-data-treetable> </clr-data-treetable> `,
  standalone: false,
})
class EmptyTestComponent {
  @ViewChild(ClrDataTreeTable, { static: true }) dataTreetable: ClrDataTreeTable;
}

describe('ClrDataTreeTable', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;
  let actionTestComponentFixture: ComponentFixture<ActionTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent, RowClickableTestComponent, ActionTestComponent],
      imports: [ClarityModule, FormsModule, ClrDataTreeTableModule, BrowserAnimationsModule],
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
  });

  it('should create', () => {
    expect(emptyTestComponent).toBeTruthy();
  });

  it('should be empty if there are no rows', () => {
    expect(emptyTestComponent.dataTreetable.empty).toBeTruthy();
    expect(rowClickableTestComponent.dataTreetable.empty).toBeFalsy();
  });

  it('should not have any clickable rows', () => {
    const noOfClickableRows = rowClickableTestComponent.ttRows.filter(ttRow => ttRow.clickable).length;
    expect(noOfClickableRows).toBe(0);
  });

  it('should not have action column', () => {
    const noOfClickableRows = rowClickableTestComponentFixture.debugElement.queryAll(
      By.css('.data-treetable-row-actions')
    ).length;
    expect(noOfClickableRows).toBe(0);
  });

  it('should have action column', done => {
    setTimeout(() => {
      actionTestComponentFixture.whenStable().then(() => {
        actionTestComponentFixture.detectChanges();
        const noOfActionCellsWHeader = actionTestComponentFixture.debugElement.queryAll(
          By.css('.data-treetable-row-actions')
        ).length;
        expect(noOfActionCellsWHeader).toBe(4);

        const noOfActionButtons = actionTestComponentFixture.debugElement.queryAll(
          By.css('.data-treetable-action-trigger')
        ).length;
        expect(noOfActionButtons).toBe(1);
        done();
      });
    }, 100);
  });
});
