/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrTreetable, ClrTreetableModule, ClrTreetableRow } from '@porscheinformatik/clr-addons';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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
})
class RowClickableTestComponent {
  @ViewChild(ClrTreetable, { static: true }) treetable: ClrTreetable;
  @ViewChildren(ClrTreetableRow) ttRows: QueryList<ClrTreetableRow>;
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
})
class ActionTestComponent {}

@Component({
  template: ` <clr-treetable> </clr-treetable> `,
})
class EmptyTestComponent {
  @ViewChild(ClrTreetable, { static: true }) treetable: ClrTreetable;
}

describe('ClrTreetable', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;
  let actionTestComponentFixture: ComponentFixture<ActionTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EmptyTestComponent, RowClickableTestComponent, ActionTestComponent],
        imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
      }).compileComponents();
    })
  );

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
    expect(emptyTestComponent.treetable.empty).toBeTruthy();
    expect(rowClickableTestComponent.treetable.empty).toBeFalsy();
  });

  it('should not have any clickable rows', () => {
    const noOfClickableRows = rowClickableTestComponent.ttRows.filter(ttRow => ttRow.clickable).length;
    expect(noOfClickableRows).toBe(0);
  });

  it('should not have action column', () => {
    const noOfClickableRows = rowClickableTestComponentFixture.debugElement.queryAll(By.css('.treetable-row-actions'))
      .length;
    expect(noOfClickableRows).toBe(0);
  });

  it('should have action column', () => {
    const noOfActionCellsWHeader = actionTestComponentFixture.debugElement.queryAll(By.css('.treetable-row-actions'))
      .length;
    expect(noOfActionCellsWHeader).toBe(4);

    const noOfActionButtons = actionTestComponentFixture.debugElement.queryAll(By.css('.treetable-action-trigger'))
      .length;
    expect(noOfActionButtons).toBe(1);
  });
});
