import { computed, Injectable, signal, TemplateRef } from '@angular/core';
import { ColumnState } from '../interfaces/column-model';
import { distinctUntilChanged, map, merge, Observable, share, Subject, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

export interface RegisterColumnOptions {
  id: string;
  hideable?: boolean;
  hidden?: boolean;
  initialHidden?: boolean;
  titleTemplateRef?: TemplateRef<unknown>;
}

export const TreetableColumnUpdate = {
  WIDTH: 'WIDTH',
  HIDDEN: 'HIDDEN',
  RESET_HIDDEN: 'RESET_HIDDEN',
} as const;
export type TreetableColumnUpdate = (typeof TreetableColumnUpdate)[keyof typeof TreetableColumnUpdate];

@Injectable()
export class TreetableColumnStateService {
  private readonly _changeWidth$ = new Subject<{ id: string; width: number }>();
  private readonly _changeHideable$ = new Subject<{ id: string; hideable: boolean; hidden: boolean }>();
  private readonly _changeHiddenForAll$ = new Subject<boolean>();
  private readonly _changeHidden$ = new Subject<{ id: string; hidden: boolean }>();
  private readonly _resetHidden$ = new Subject<void>();

  private readonly _columnState = signal<Record<string, ColumnState>>({});

  readonly columns = computed(() => Object.values(this._columnState()).sort((a, b) => a.columnIndex - b.columnIndex));
  readonly visibleColumns = computed(() => this.columns().filter(column => !column.hidden));
  readonly hideableColumns = computed(() => this.columns().filter(column => column.hideable));
  readonly hasHideableColumns = computed(() => this.hideableColumns()?.length > 0);

  private readonly _changeWidthAction$ = this._changeWidth$.pipe(
    tap(({ id, width }) => this.update(id, { width })),
    share()
  );

  private readonly _changeHideableAction$ = this._changeHideable$.pipe(
    tap(patch => {
      const current = this.getColumn(patch.id);

      if (current.hideable && !patch.hideable) {
        this.update(patch.id, { hideable: false, hidden: false, initialHidden: false });
      }

      if (!current.hideable && patch.hideable) {
        this.update(patch.id, { hideable: true, hidden: patch.hidden, initialHidden: patch.hidden });
      }

      this.update(patch.id, { hidden: patch.hidden });
    }),
    share()
  );

  private readonly _changeHiddenAction$ = this._changeHidden$.pipe(
    filter(change => this.getColumn(change.id)?.hideable),
    tap(change => this.update(change.id, { hidden: change.hidden })),
    share()
  );

  private readonly _changeHiddenForAllAction$ = this._changeHiddenForAll$.pipe(
    tap(change => {
      this._columnState.update(current =>
        Object.fromEntries(
          Object.entries(current).map(([id, column]) => [
            id,
            {
              ...column,
              hidden: change,
            },
          ])
        )
      );
    }),
    share()
  );

  private readonly _resetHiddenAction$ = this._resetHidden$.pipe(
    tap(() => {
      this._columnState.update(current =>
        Object.fromEntries(
          Object.entries(current).map(([id, column]) => [
            id,
            column.hideable
              ? {
                  ...column,
                  hidden: column.initialHidden,
                }
              : column,
          ])
        )
      );
    }),
    share()
  );

  readonly changes$: Observable<TreetableColumnUpdate> = merge(
    this._changeWidthAction$.pipe(map(() => TreetableColumnUpdate.WIDTH)),
    this._changeHideableAction$.pipe(map(() => TreetableColumnUpdate.HIDDEN)),
    this._changeHiddenForAllAction$.pipe(map(() => TreetableColumnUpdate.HIDDEN)),
    this._changeHiddenAction$.pipe(map(() => TreetableColumnUpdate.HIDDEN)),
    this._resetHiddenAction$.pipe(map(() => TreetableColumnUpdate.HIDDEN))
  );

  constructor() {
    this._changeWidthAction$.pipe(takeUntilDestroyed()).subscribe();
    this._changeHideableAction$.pipe(takeUntilDestroyed()).subscribe();
    this._changeHiddenForAllAction$.pipe(takeUntilDestroyed()).subscribe();
    this._changeHiddenAction$.pipe(takeUntilDestroyed()).subscribe();
    this._resetHiddenAction$.pipe(takeUntilDestroyed()).subscribe();
  }

  public register(options: RegisterColumnOptions): void {
    this._columnState.update(current => ({
      ...current,
      [options.id]: {
        id: options.id,
        columnIndex: Number.MAX_SAFE_INTEGER,
        hideable: false,
        hidden: false,
        initialHidden: false,
        titleTemplateRef: options.titleTemplateRef,
      },
    }));
  }

  public registerHideable(columnId: string, options: Omit<RegisterColumnOptions, 'id'>): void {
    this._columnState.update(current => {
      const existing = current[columnId];
      if (!existing) {
        return current;
      }

      return {
        ...current,
        [columnId]: {
          ...existing,
          hideable: options.hideable,
          hidden: options.hidden,
          initialHidden: options.initialHidden ?? options.hidden,
          titleTemplateRef: options.titleTemplateRef,
        },
      };
    });
  }

  public unregister(id: string): void {
    this._columnState.update(current => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  public initializeOrder(idsInRenderOrder: string[]): void {
    this._columnState.update(current => {
      const next = { ...current };

      idsInRenderOrder.forEach((id, index) => {
        if (next[id]) {
          next[id] = {
            ...next[id],
            columnIndex: index,
          };
        }
      });

      return next;
    });
  }

  public changeWidth(id: string, width: number): void {
    this._changeWidth$.next({ id, width });
  }

  public changeHideable(id: string, hideable: boolean, hidden: boolean): void {
    this._changeHideable$.next({ id, hideable, hidden: hidden ?? false });
  }

  public changeHiddenForAll(hidden: boolean): void {
    this._changeHiddenForAll$.next(hidden);
  }

  public displayAllColumns(): void {
    this.changeHiddenForAll(false);
  }

  public toggleHidden(id: string): void {
    const current = this.getColumn(id);
    this._changeHidden$.next({ id, hidden: !current.hidden });
  }

  public resetToInitialHidden(): void {
    this._resetHidden$.next();
  }

  public getColumnState(id: string): Observable<ColumnState> {
    return toObservable(this._columnState).pipe(
      map(columns => columns[id]),
      distinctUntilChanged()
    );
  }

  private getColumn(id: string): ColumnState | undefined {
    return this._columnState()[id];
  }

  private update(id: string, patch: Partial<ColumnState>): void {
    this._columnState.update(current => {
      const existing = current[id];
      if (!existing) {
        return current;
      }

      return {
        ...current,
        [id]: {
          ...existing,
          ...patch,
          id: existing.id,
        },
      };
    });
  }
}
