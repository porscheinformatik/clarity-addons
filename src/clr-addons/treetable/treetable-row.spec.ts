/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrTreetableActionOverflow, ClrTreetableModule, ClrTreetableRow } from '@porscheinformatik/clr-addons';
import { Component, DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrTreetableRowCheckbox } from './treetable-row-checkbox';
import { ClrTreetableSelectedState } from './enums/selection-type';

type Item = { id: number; subItems: Item[] };

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row> </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class EmptyTestComponent {}

@Component({
  template: `
    <clr-treetable>
      <clr-tt-column></clr-tt-column>

      <clr-tt-row [clrExpandable]="true" [clrExpanded]="true">
        <clr-tt-action-overflow>
          <button class="action-item">Test Action</button>
        </clr-tt-action-overflow>
        <clr-tt-cell></clr-tt-cell>

        <clr-tt-row>
          <clr-tt-cell></clr-tt-cell>
        </clr-tt-row>
      </clr-tt-row>

      <clr-tt-row>
        <clr-tt-cell></clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class ActionOverflowTestComponent {}

@Component({
  template: `
    <clr-treetable>
      <clr-tt-column></clr-tt-column>

      <clr-tt-row [clrExpandable]="expandable()" [clrExpanded]="expanded()" [clrClickable]="clickable()">
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
  // Signals for testing the inputs, mirror the default values to test the default behaviour
  readonly clickable = signal(true);
  readonly expanded = signal(false);
  readonly expandable = signal(true); // not the default value
}

@Component({
  template: `
    <clr-treetable [(clrTtSelected)]="selected">
      <clr-tt-column>ID</clr-tt-column>
      <clr-tt-row *clrTtItems="let item of allItems(); getChildren: getSubItems; clrTtNode as node" [clrTtItem]="node">
        <clr-tt-cell>{{ item.id }}</clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class SelectableTestComponent {
  allItems = signal<Item[]>([
    { id: 1, subItems: [] },
    { id: 2, subItems: [{ id: 3, subItems: [] }] },
    { id: 4, subItems: [] },
  ]);
  selected = signal<Item[]>([]);

  getSubItems = (item: Item): Item[] => item?.subItems ?? [];
}

describe('ClrTreetableRow', () => {
  const TEST_IDS = {
    rowCaret: '[data-testId="clrTtRowCaret"]',
    childContainer: '[data-testId="clrTtRowChildContainer"]',
  } as const;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmptyTestComponent,
        ActionOverflowTestComponent,
        RowClickableTestComponent,
        SelectableTestComponent,
      ],
      imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  describe('empty content component', () => {
    let component: EmptyTestComponent;
    let fixture: ComponentFixture<EmptyTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(EmptyTestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should derive display state correctly', async () => {
      await fixture.whenStable();

      const ttRowDe = fixture.debugElement.query(By.directive(ClrTreetableRow));
      const ttRow: ClrTreetableRow<object> = ttRowDe.componentInstance;

      const checkBoxDe = ttRowDe.query(By.directive(ClrTreetableRowCheckbox));
      const actionOverflowDe = ttRowDe.query(By.directive(ClrTreetableActionOverflow));
      const caretDe = ttRowDe.query(By.css(TEST_IDS.rowCaret));
      const childContainer: HTMLElement = ttRowDe.query(By.css(TEST_IDS.childContainer)).nativeElement;

      expect(ttRow.clrExpanded()).toBeFalse();
      expect(ttRow.clrExpandable()).toBeFalse();
      expect(ttRow.clrClickable()).toBeTrue();
      expect(ttRow.clrTtItem()).toBeUndefined();

      expect(checkBoxDe).toBeFalsy();
      expect(actionOverflowDe).toBeFalsy();
      expect(caretDe).toBeFalsy();
      expect(childContainer.classList).toContain('collapsed');
    });
  });

  describe('action overflow content component', () => {
    let component: ActionOverflowTestComponent;
    let fixture: ComponentFixture<ActionOverflowTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ActionOverflowTestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should render action overflow for all rows, if only one has an action overflow', async () => {
      await fixture.whenStable();

      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));

      for (let i = 0; i < ttRowDes.length; i++) {
        const ttRowDe = ttRowDes[i];

        const actionOverflowDe = ttRowDe.query(By.directive(ClrTreetableActionOverflow));
        expect(actionOverflowDe).toBeDefined();

        if (i === 0) {
          expect(actionOverflowDe.componentInstance.empty()).toBeFalse();
        } else {
          expect(actionOverflowDe.componentInstance.empty()).toBeTrue();
        }
      }
    });

    it('should render action overflow action item, when clicked', async () => {
      await fixture.whenStable();

      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const ttRowDe = ttRowDes[0];

      const actionOverflowDe = ttRowDe.query(By.directive(ClrTreetableActionOverflow));
      const testActionDe = actionOverflowDe.query(By.css('.action-item'));
      expect(actionOverflowDe).toBeDefined();
      expect(testActionDe).toBeNull();

      actionOverflowDe.nativeElement.click();

      expect(testActionDe).toBeDefined();
    });
  });

  describe('row click inputs:', () => {
    let component: RowClickableTestComponent;
    let fixture: ComponentFixture<RowClickableTestComponent>;

    let ttRowDe: DebugElement;
    let ttRowComponent: ClrTreetableRow<object>;

    beforeEach(() => {
      fixture = TestBed.createComponent(RowClickableTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      ttRowDe = fixture.debugElement.query(By.directive(ClrTreetableRow));
      ttRowComponent = ttRowDe.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should expand if row clicked, and is clickable', () => {
      expect(ttRowComponent.clrExpanded()).toBeFalse();
      expect(ttRowComponent.clrClickable()).toBeTrue();

      const row: HTMLElement = fixture.debugElement.query(By.css('.treetable-row:first-of-type')).nativeElement;
      row.click();
      fixture.detectChanges();

      expect(ttRowComponent.clrExpanded()).toBeTrue();
    });

    it('should expand if caret clicked, and row is clickable', () => {
      expect(ttRowComponent.clrExpanded()).toBeFalse();
      expect(ttRowComponent.clrClickable()).toBeTrue();

      const caret: HTMLElement = ttRowDe.query(By.css(TEST_IDS.rowCaret)).nativeElement;
      caret.click();
      fixture.detectChanges();

      expect(ttRowComponent.clrExpanded()).toBeTrue();
    });

    it('should not expand if row clicked, and is not clickable', () => {
      component.clickable.set(false);
      fixture.detectChanges();

      expect(ttRowComponent.clrExpanded()).toBeFalse();
      expect(ttRowComponent.clrClickable()).toBeFalse();

      const row: HTMLElement = fixture.debugElement.query(By.css('.treetable-row:first-of-type')).nativeElement;
      row.click();
      fixture.detectChanges();

      expect(ttRowComponent.clrExpanded()).toBeFalse();
    });

    it('should expand if caret clicked, and row is not clickable', () => {
      component.clickable.set(false);
      fixture.detectChanges();

      expect(ttRowComponent.clrExpanded()).toBeFalse();
      expect(ttRowComponent.clrClickable()).toBeFalse();

      const caret: HTMLElement = ttRowDe.query(By.css(TEST_IDS.rowCaret)).nativeElement;
      caret.click();
      fixture.detectChanges();

      expect(ttRowComponent.clrExpanded()).toBeTrue();
    });
  });

  describe('row selection', () => {
    let component: SelectableTestComponent;
    let fixture: ComponentFixture<SelectableTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectableTestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should render checkbox for all rows', () => {
      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));

      for (let i = 0; i < ttRowDes.length; i++) {
        const ttRowDe = ttRowDes[i];

        const rowCheckBox = ttRowDe.query(By.directive(ClrTreetableRowCheckbox));
        expect(rowCheckBox).toBeDefined();
      }
    });

    it('should preselect given item', async () => {
      const expectedCheckBoxStates: Record<number, ClrTreetableSelectedState> = {
        0: ClrTreetableSelectedState.SELECTED,
        1: ClrTreetableSelectedState.UNSELECTED,
        2: ClrTreetableSelectedState.UNSELECTED,
        3: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      const testSelectedItems = [component.allItems()[0]];
      component.selected.set(testSelectedItems);
      await fixture.whenStable();

      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));

      expectRowsToHaveSelectionStates(ttRowDes, expectedCheckBoxStates);
    });

    it('should toggle selection for a row without children', async () => {
      const expectedCheckBoxStates: Record<number, ClrTreetableSelectedState> = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.UNSELECTED,
        2: ClrTreetableSelectedState.UNSELECTED,
        3: ClrTreetableSelectedState.SELECTED,
      } as const;

      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const ttRowToTest = ttRowDes[3];

      const rowCheckBox = ttRowToTest
        .query(By.directive(ClrTreetableRowCheckbox))
        .query(By.css('input[type="checkbox"]'));
      rowCheckBox.nativeElement.click();
      await fixture.whenStable();

      expectRowsToHaveSelectionStates(ttRowDes, expectedCheckBoxStates);
    });

    it('should toggle selection for a row with children', async () => {
      const expectedCheckBoxStates: Record<number, ClrTreetableSelectedState> = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.SELECTED,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const ttRowToTest = ttRowDes[1];

      const rowCheckBox = ttRowToTest
        .query(By.directive(ClrTreetableRowCheckbox))
        .query(By.css('input[type="checkbox"]'));
      rowCheckBox.nativeElement.click();
      await fixture.whenStable();

      expectRowsToHaveSelectionStates(ttRowDes, expectedCheckBoxStates);
    });

    it('should toggle selection for a parent row if all child rows were selected', async () => {
      const expectedCheckBoxStates: Record<number, ClrTreetableSelectedState> = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.SELECTED,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      const ttRowDes: DebugElement[] = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const ttRowToTest = ttRowDes[2];

      const rowCheckBox = ttRowToTest
        .query(By.directive(ClrTreetableRowCheckbox))
        .query(By.css('input[type="checkbox"]'));
      rowCheckBox.nativeElement.click();
      await fixture.whenStable();

      expectRowsToHaveSelectionStates(ttRowDes, expectedCheckBoxStates);
    });
  });
});

function expectRowsToHaveSelectionStates(rows: DebugElement[], expected: Record<number, ClrTreetableSelectedState>) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const ttRowComponent: ClrTreetableRow<Item> = row.componentInstance;
    expect(ttRowComponent.clrTtItem().selected()).toBe(expected[i]);
  }
}
