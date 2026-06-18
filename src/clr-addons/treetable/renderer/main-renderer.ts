/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { afterRenderEffect, contentChildren, Directive, inject } from '@angular/core';

import { ClrTreetableColumn } from '../treetable-column';
import { TreetableHeaderRenderer } from './header-renderer';
import { TreetableRowRenderer } from './row-renderer';
import { first, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TreetableColumnStateService, TreetableColumnUpdate } from '../providers/treetable-column-state.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { TreetableCellRenderer } from './cell-renderer';
import { ColumnState } from '../interfaces/column-model';

type ColumnCtx = {
  index: number;
  header?: TreetableHeaderRenderer;
  state?: ColumnState;
};

interface ColumnRule<T = any> {
  key: string;
  prepareData: (ctx: ColumnCtx) => T | null;
  applyHeader?: (header: TreetableHeaderRenderer, data: T, ctx: ColumnCtx) => void;
  applyCell?: (cell: TreetableCellRenderer, data: T, ctx: ColumnCtx) => void;
}

@Directive({
  selector: 'clr-treetable',
  standalone: false,
})
export class TreetableMainRenderer {
  private readonly _columnState = inject(TreetableColumnStateService);

  private readonly headers = contentChildren(TreetableHeaderRenderer);
  private readonly rows = contentChildren(TreetableRowRenderer, { descendants: true });
  private readonly columns = contentChildren(ClrTreetableColumn);

  private readonly rules: readonly ColumnRule[] = [
    this.createClassesRule(),
    this.createFirstColumnWidthRule(),
    this.createDisplayRule(),
  ];

  constructor() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntilDestroyed())
      .subscribe(() => this.renderRuleByKey('first-column-width', this.headers(), this.rows()));

    afterRenderEffect(() => {
      const headers = this.headers();
      const rows = this.rows();

      if (headers.length > 0) {
        this.renderAllRules(headers, rows);
      }
    });

    this._columnState.changes$.pipe(takeUntilDestroyed()).subscribe(event => {
      const headers = this.headers();
      const rows = this.rows();

      switch (event) {
        case TreetableColumnUpdate.HIDDEN:
          this.renderRuleByKey('display', headers, rows);
          break;
        case TreetableColumnUpdate.RESET_HIDDEN:
          this.renderAllRules(headers, rows); // resetHidden etc.
          break;
        case TreetableColumnUpdate.WIDTH:
          this.renderRuleByKey('first-column-width', headers, rows);
          break;
        default:
          this.renderAllRules(headers, rows);
      }
    });

    toObservable(this.columns)
      .pipe(first())
      .subscribe(columns => this.initializeColumnOrder(columns));
  }

  /**
   * Initializes the index order of the columns as they are rendered.
   */
  private initializeColumnOrder(columns: Readonly<ClrTreetableColumn<any>[]>): void {
    const idsInOrder = columns.map(column => column.columnId);
    this._columnState.initializeOrder(idsInOrder);
  }

  private renderAllRules(headers: readonly TreetableHeaderRenderer[], rows: readonly TreetableRowRenderer[]): void {
    this.render(this.rules, headers, rows);
  }

  private renderRuleByKey(
    key: string,
    headers: readonly TreetableHeaderRenderer[],
    rows: readonly TreetableRowRenderer[]
  ): void {
    const activeRules = this.rules.filter(rule => rule.key === key);
    this.render(activeRules, headers, rows);
  }

  private render(
    activeRules: readonly ColumnRule[],
    headers: readonly TreetableHeaderRenderer[],
    rows: readonly TreetableRowRenderer[]
  ): void {
    const columnStates = this._columnState.columns();
    const statesByIdx = new Map(columnStates.map(state => [state.columnIndex, state]));

    for (const [idx, header] of headers.entries()) {
      const ctx: ColumnCtx = {
        index: idx,
        header: header,
        state: statesByIdx.get(idx),
      };

      const preparedRules = activeRules
        .map(rule => ({ rule, data: rule.prepareData(ctx) }))
        .filter((x): x is { rule: ColumnRule; data: NonNullable<unknown> } => x.data !== null);

      for (const { rule, data } of preparedRules) {
        rule.applyHeader?.(header, data, ctx);
      }

      for (const row of rows) {
        const cell = row.cells()[idx];
        if (!cell) {
          continue;
        }

        for (const { rule, data } of preparedRules) {
          rule.applyCell?.(cell, data, ctx);
        }
      }
    }
  }

  private createClassesRule(): ColumnRule<{ classes: string[]; useDefault: boolean }> {
    return {
      key: 'classes',
      prepareData: ctx => {
        if (!ctx.header) {
          return null;
        }
        const classes = ctx.header.getColumnClasses();
        return { classes: classes.length ? classes : ['clr-col'], useDefault: classes.length === 0 };
      },
      applyHeader: (header, data) => {
        if (data.useDefault) {
          header.setDefaultColumnClass();
        }
      },
      applyCell: (cell, data) => {
        cell.setColumnClasses(data.classes);
      },
    };
  }

  private createFirstColumnWidthRule(): ColumnRule<{ width: number }> {
    return {
      key: 'first-column-width',
      prepareData: ctx => {
        if (ctx.index !== 0 || !ctx.header) {
          return null;
        }
        return { width: ctx.header.getWidth() };
      },
      applyCell: (cell, data) => {
        cell.setMaxWidth(data.width);
      },
    };
  }

  private createDisplayRule(): ColumnRule<{ hidden: boolean }> {
    return {
      key: 'display',
      prepareData: ctx => ({ hidden: !!ctx.state?.hidden }),
      applyHeader: (header, data) => {
        if (data.hidden) {
          header.hide();
        } else {
          header.show();
        }
      },
      applyCell: (cell, data) => {
        if (data.hidden) {
          cell.hide();
        } else {
          cell.show();
        }
      },
    };
  }
}
