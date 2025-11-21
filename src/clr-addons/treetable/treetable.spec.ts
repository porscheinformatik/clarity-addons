/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule, ClrSpinner } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import {
  ClrTreetable,
  ClrTreetableActionOverflow,
  ClrTreetableColumn,
  ClrTreetableModule,
  ClrTreetableRow,
} from '@porscheinformatik/clr-addons';
import { Component, DebugElement, signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ClrTreetableSelectedState, SelectionType } from './enums/selection-type';
import { ExpectedRowSelectionState, expectRowsToHaveSelectionStates } from './treetable-row.spec';
import { ClrTreetableRowCheckbox } from './treetable-row-checkbox';

type Item = { id: number; name?: string; subItems?: Item[] };

@Component({
  template: `
    <clr-treetable [clrHideHeader]="hideHeader()">
      <clr-tt-column>Col</clr-tt-column>
      <clr-tt-row [clrExpandable]="true">
        <clr-tt-cell></clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class HideHeaderTestComponent {
  readonly hideHeader = signal(false);
}

@Component({
  template: `
    <clr-treetable [clrClickableRows]="clickableRows()">
      <clr-tt-column></clr-tt-column>
      <clr-tt-row [clrExpandable]="true">
        <clr-tt-cell>1</clr-tt-cell>
        <clr-tt-row>
          <clr-tt-cell>2</clr-tt-cell>
        </clr-tt-row>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class ClickableRowTestComponent {
  readonly clickableRows = signal(true);
}

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row>
        <clr-tt-action-overflow>
          <button class="action-item">Action</button>
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
class ActionOverflowTestComponent {}

@Component({
  template: `
    <clr-treetable [(clrTtSelected)]="selected" [clrTtAutoParentSelection]="autoParentSelection()">
      <clr-tt-column>ID</clr-tt-column>
      <clr-tt-row *clrTtItems="let item of items(); getChildren: getSubItems; clrTtNode as node" [clrTtItem]="node">
        <clr-tt-cell>{{ item.id }}</clr-tt-cell>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class SelectionTestComponent {
  readonly items = signal<Item[]>([
    { id: 1, subItems: [] },
    {
      id: 2,
      subItems: [
        { id: 3, subItems: [] },
        { id: 4, subItems: [] },
      ],
    },
    { id: 5, subItems: [] },
  ]);
  readonly selected = signal<Item[]>([]);
  readonly autoParentSelection = signal(true);

  getSubItems = (item: Item) => item.subItems ?? [];
}

describe('ClrTreetable', () => {
  const TreetableInputs: Record<string, string> = {
    loading: 'clrTtLoading',
    hideHeaders: 'clrHideHeaders',
    selected: 'clrTtSelected',
    clickableRows: 'clrClickableRows',
    autoParentSelection: 'clrTtAutoParentSelection',
  } as const;

  const TEST_IDS: Record<string, string> = {
    rowCaret: '[data-testId="clrTtRowCaret"]',
    selectAll: '[data-testId="clrTtSelectAll"]',
  } as const;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HideHeaderTestComponent,
        ClickableRowTestComponent,
        ActionOverflowTestComponent,
        SelectionTestComponent,
      ],
      imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  describe('empty content', () => {
    let component: ClrTreetable<Item>;
    let fixture: ComponentFixture<ClrTreetable<Item>>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ClrTreetable<Item>);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should derive empty display state correctly', async () => {
      await fixture.whenStable();

      const ttRows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const ttColumns = fixture.debugElement.queryAll(By.directive(ClrTreetableColumn));
      const ttSpinner = fixture.debugElement.query(By.directive(ClrSpinner));

      expect(fixture.nativeElement.classList).toContain('empty');
      expect(ttRows.length).toBe(0);
      expect(ttColumns.length).toBe(0);
      expect(ttSpinner).toBeNull();
      expect(component.selectionType()).toBe(SelectionType.None);
      expect(component.showSelection()).toBe(false);
      expect(component.hasActionOverflow()).toBe(false);
    });
  });

  describe('loading state', () => {
    let fixture: ComponentFixture<ClrTreetable<Item>>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ClrTreetable<Item>);
      fixture.autoDetectChanges();
    });

    it('should show spinner when loading', async () => {
      fixture.componentRef.setInput(TreetableInputs.loading, true);
      await fixture.whenStable();

      const ttSpinner = fixture.debugElement.query(By.directive(ClrSpinner));
      expect(ttSpinner).toBeTruthy();
    });

    it('should not show spinner when not loading', async () => {
      fixture.componentRef.setInput(TreetableInputs.loading, false);
      await fixture.whenStable();

      const ttSpinner = fixture.debugElement.query(By.directive(ClrSpinner));
      expect(ttSpinner).toBeFalsy();
    });

    it('should toggle spinner when loading changes', async () => {
      fixture.componentRef.setInput(TreetableInputs.loading, true);
      await fixture.whenStable();

      const ttSpinnerIsLoading = fixture.debugElement.query(By.directive(ClrSpinner));
      expect(ttSpinnerIsLoading).toBeTruthy();

      fixture.componentRef.setInput(TreetableInputs.loading, false);
      await fixture.whenStable();

      const ttSpinnerIsNotLoading = fixture.debugElement.query(By.directive(ClrSpinner));
      expect(ttSpinnerIsNotLoading);
    });
  });

  describe('hide header', () => {
    let fixture: ComponentFixture<HideHeaderTestComponent>;
    let component: HideHeaderTestComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(HideHeaderTestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('should not hide header initially', () => {
      const header: HTMLElement = fixture.debugElement.query(By.css('.treetable-header')).nativeElement;
      expect(header.classList).not.toContain('hide-header');
    });

    it('should hide header when input flag is set', () => {
      component.hideHeader.set(true);
      fixture.detectChanges();
      const header: HTMLElement = fixture.debugElement.query(By.css('.treetable-header')).nativeElement;
      expect(header.classList).toContain('hide-header');
    });
  });

  describe('clickable rows', () => {
    let fixture: ComponentFixture<ClickableRowTestComponent>;
    let component: ClickableRowTestComponent;
    let ttRowDe: DebugElement;
    let ttRow: ClrTreetableRow<object>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ClickableRowTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      ttRowDe = fixture.debugElement.query(By.directive(ClrTreetableRow));
      ttRow = ttRowDe.componentInstance;
    });

    it('should expand on click when clickableRows true', () => {
      expect(ttRow.clrExpanded()).toBeFalse();

      const row: HTMLElement = ttRowDe.query(By.css('.treetable-row')).nativeElement;
      row.click();
      fixture.detectChanges();

      expect(ttRow.clrExpanded()).toBeTrue();
    });

    it('should not expand on row click when clickableRows false but caret click works', () => {
      component.clickableRows.set(false);
      fixture.detectChanges();

      const row: HTMLElement = ttRowDe.query(By.directive(ClrTreetableRow)).nativeElement;
      row.click();
      fixture.detectChanges();
      expect(ttRow.clrExpanded()).toBeFalse();

      const caretBtn: HTMLElement = ttRowDe.query(By.css(TEST_IDS.rowCaret)).nativeElement;
      caretBtn.click();
      fixture.detectChanges();
      expect(ttRow.clrExpanded()).toBeTrue();
    });
  });

  describe('action overflow', () => {
    let fixture: ComponentFixture<ActionOverflowTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ActionOverflowTestComponent);
      fixture.detectChanges();
    });

    it('should render action overflow placeholder on rows without explicit content', () => {
      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      expect(rows.length).toBe(3);

      const firstOverflow = rows[0].query(By.directive(ClrTreetableActionOverflow)).componentInstance;
      expect(firstOverflow.empty()).toBeFalse();

      const secondOverflow = rows[1].query(By.directive(ClrTreetableActionOverflow)).componentInstance;
      expect(secondOverflow.empty()).toBeTrue();

      const thirdOverflow = rows[2].query(By.directive(ClrTreetableActionOverflow)).componentInstance;
      expect(thirdOverflow.empty()).toBeTrue();
    });

    it('should render action overflow column in header', () => {
      const headerActionColumn = fixture.debugElement.query(By.css('.treetable-header .treetable-row-actions'));
      expect(headerActionColumn).toBeTruthy();
    });

    it('should not expand when clicking action overflow trigger', () => {
      const firstRow = fixture.debugElement.query(By.directive(ClrTreetableRow));
      const firstRowComponent: ClrTreetableRow<object> = firstRow.componentInstance;
      expect(firstRowComponent.clrExpanded()).toBeFalse();

      const trigger: HTMLElement = firstRow.query(By.css('.treetable-action-trigger')).nativeElement;
      trigger.click();
      fixture.detectChanges();

      expect(firstRowComponent.clrExpanded()).toBeFalse();
    });
  });

  describe('selection', () => {
    let fixture: ComponentFixture<SelectionTestComponent>;
    let component: SelectionTestComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectionTestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('should render checkbox column', () => {
      const selectAllCheckBox = fixture.debugElement.query(By.css(TEST_IDS.selectAll));
      expect(selectAllCheckBox).toBeTruthy();
    });

    it('should render checkbox for each row', () => {
      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      for (const row of rows) {
        const checkBox = row.query(By.directive(ClrTreetableRowCheckbox));
        expect(checkBox).toBeTruthy();
      }
    });

    it('should preselect external items', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.SELECTED,
        1: ClrTreetableSelectedState.UNSELECTED,
        2: ClrTreetableSelectedState.UNSELECTED,
        3: ClrTreetableSelectedState.UNSELECTED,
        4: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      component.selected.set([component.items()[0]]);
      fixture.detectChanges();
      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));

      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });

    it('should toggle selection of leaf row', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.UNSELECTED,
        2: ClrTreetableSelectedState.UNSELECTED,
        3: ClrTreetableSelectedState.UNSELECTED,
        4: ClrTreetableSelectedState.SELECTED,
      } as const;

      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const leaf = rows[4];
      const input = leaf.query(By.css('input[type="checkbox"]')).nativeElement;
      input.click();
      fixture.detectChanges();

      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });

    it('should cascade selection to children when selecting parent with children', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.SELECTED,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.SELECTED,
        4: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const parent = rows[1];
      const parentCheckBox = parent.query(By.css('input[type="checkbox"]')).nativeElement;
      parentCheckBox.click();
      fixture.detectChanges();

      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });

    it('should set parent to indeterminate selection state when only one child of multiple is selected', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.INDETERMINATE,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.UNSELECTED,
        4: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const child1 = rows[2];
      const child1CheckBox = child1.query(By.css('input[type="checkbox"]')).nativeElement;
      child1CheckBox.click();

      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });

    it('should select parent when all children are selected', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.SELECTED,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.SELECTED,
        4: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const child1 = rows[2];
      const child1CheckBox = child1.query(By.css('input[type="checkbox"]')).nativeElement;
      child1CheckBox.click();

      const child2 = rows[3];
      const child2CheckBox = child2.query(By.css('input[type="checkbox"]')).nativeElement;
      child2CheckBox.click();
      fixture.detectChanges();

      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });

    it('should keep parent indeterminate when auto parent selection disabled and all children are selected', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.UNSELECTED,
        1: ClrTreetableSelectedState.INDETERMINATE,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.SELECTED,
        4: ClrTreetableSelectedState.UNSELECTED,
      } as const;

      component.autoParentSelection.set(false);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      const child1 = rows[2];
      const child1CheckBox = child1.query(By.css('input[type="checkbox"]')).nativeElement;
      child1CheckBox.click();

      const child2 = rows[3];
      const child2CheckBox = child2.query(By.css('input[type="checkbox"]')).nativeElement;
      child2CheckBox.click();
      fixture.detectChanges();

      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });

    it('should toggle select all via header checkbox', () => {
      const expectedCheckBoxStates: ExpectedRowSelectionState = {
        0: ClrTreetableSelectedState.SELECTED,
        1: ClrTreetableSelectedState.SELECTED,
        2: ClrTreetableSelectedState.SELECTED,
        3: ClrTreetableSelectedState.SELECTED,
        4: ClrTreetableSelectedState.SELECTED,
      } as const;

      const selectAllCheckBox = fixture.debugElement.query(By.css(TEST_IDS.selectAll));
      selectAllCheckBox.nativeElement.click();
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.directive(ClrTreetableRow));
      expectRowsToHaveSelectionStates(rows, expectedCheckBoxStates);
    });
  });
});
