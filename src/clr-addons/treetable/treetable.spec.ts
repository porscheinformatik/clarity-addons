/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrTreetable, ClrTreetableModule, ClrTreetableRow } from '@porscheinformatik/clr-addons';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <clr-treetable [clrClickableRows]="false">
      <clr-datagrid>
        <clr-tt-row>
          <clr-dg-cell>1</clr-dg-cell>
          
          <clr-tt-row>
            <clr-dg-cell>2</clr-dg-cell>
          </clr-tt-row>
        </clr-tt-row>
        
        <clr-tt-row>
          <clr-dg-cell>3</clr-dg-cell>
        </clr-tt-row>
      </clr-datagrid>
    </clr-treetable>
  `,
})
class RowClickableTestComponent {
  @ViewChild(ClrTreetable) treetable;
  @ViewChildren(ClrTreetableRow) ttRows;
}

@Component({
  template: `
    <clr-treetable>
      <clr-datagrid>
      </clr-datagrid>
    </clr-treetable>
  `,
})
class EmptyTestComponent {
  @ViewChild(ClrTreetable) treetable;
}

describe('ClrTreetable', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent, RowClickableTestComponent],
      imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
    }).compileComponents();

    rowClickableTestComponentFixture = TestBed.createComponent(RowClickableTestComponent);
    rowClickableTestComponent = rowClickableTestComponentFixture.componentInstance;
    rowClickableTestComponentFixture.detectChanges();

    emptyTestComponentFixture = TestBed.createComponent(EmptyTestComponent);
    emptyTestComponent = emptyTestComponentFixture.componentInstance;
    emptyTestComponentFixture.detectChanges();
  }));

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
});
