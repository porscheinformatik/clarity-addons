/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrDataTreeTableModule, ClrDataTreeTableRow } from '@porscheinformatik/clr-addons';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <clr-data-treetable>
      <clr-dt-row [clrExpandable]="true">
        <clr-dt-cell></clr-dt-cell>

        <clr-dt-row>
          <clr-dt-cell></clr-dt-cell>
        </clr-dt-row>
      </clr-dt-row>
    </clr-data-treetable>
  `,
  standalone: false,
})
class RowClickableTestComponent {
  @ViewChild(ClrDataTreeTableRow, { static: true }) ttRow: ClrDataTreeTableRow;
}

@Component({
  template: `
    <clr-data-treetable>
      <clr-dt-row> </clr-dt-row>
    </clr-data-treetable>
  `,
  standalone: false,
})
class EmptyTestComponent {
  @ViewChild(ClrDataTreeTableRow, { static: true }) ttRow: ClrDataTreeTableRow;
}

describe('ClrDataTreeTableRow', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent, RowClickableTestComponent],
      imports: [ClarityModule, FormsModule, ClrDataTreeTableModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
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

  it('should expand if clicked', () => {
    expect(rowClickableTestComponent.ttRow.expanded).toBeFalsy();
    const row = rowClickableTestComponentFixture.debugElement.query(By.css('.data-treetable-row:first-of-type'));
    row.triggerEventHandler('click', { target: row.nativeElement });
    rowClickableTestComponentFixture.detectChanges();
    expect(rowClickableTestComponent.ttRow.expanded).toBeTruthy();
  });
});
