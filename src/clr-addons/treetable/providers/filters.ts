import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ClrTreetableFilterInterface } from '../interfaces/filter-model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, shareReplay, Subject } from 'rxjs';

export class RegisteredTreetableFilter<T, F extends ClrTreetableFilterInterface<T>> {
  constructor(public filter: F, public unregister: () => void) {}
}

type RegisteredFilter<T> = RegisteredTreetableFilter<T, ClrTreetableFilterInterface<T>>;
type TreetableFilterState<T> = Record<string, { filter: RegisteredFilter<T>; value: unknown | undefined }>;
type FilterValueUpdate = { filterId: string; value: unknown };

@Injectable()
export class Filters<T> {
  private readonly _destroyRef = inject(DestroyRef);

  private filterId = 0;
  private readonly updateFilterValue$ = new Subject<FilterValueUpdate>();

  private readonly _filterState = signal<TreetableFilterState<T>>({});
  private readonly _registeredFilters = computed<RegisteredFilter<T>[]>(() => {
    const filterStates = Object.values(this._filterState());
    return filterStates.map(({ filter }) => filter);
  });

  readonly activeFilters = computed(() => {
    return this._registeredFilters()
      .filter(({ filter }) => filter.isActive())
      .map(({ filter }) => filter);
  });
  readonly hasActiveFilters = computed(() => this.activeFilters().length > 0);

  readonly changes$ = toObservable(this._filterState).pipe(
    map(filterState => Object.values(filterState).map(({ value }) => value)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor() {
    this.updateFilterValue$.pipe(takeUntilDestroyed()).subscribe((update: FilterValueUpdate) => {
      this._filterState.update(current => {
        const state = current[update.filterId] || { filter: undefined, value: undefined };
        return {
          ...current,
          [update.filterId]: {
            ...state,
            value: update.value,
          },
        };
      });
    });
  }

  register<F extends ClrTreetableFilterInterface<T>>(treetableFilter: F): RegisteredTreetableFilter<T, F> {
    if (!treetableFilter) {
      return undefined;
    }

    const filterId = `clr-tt-filter-${this.filterId++}`;
    const subscription = treetableFilter.changes
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(valueChange => this.updateFilterValue$.next({ filterId, value: valueChange }));

    let hasUnregistered = false;
    const registered = new RegisteredTreetableFilter(treetableFilter, () => {
      if (hasUnregistered) {
        return;
      }

      subscription.unsubscribe();
      this._filterState.update(current => {
        delete current[filterId];
        return { ...current };
      });

      hasUnregistered = true;
    });

    this._filterState.update(current => {
      const state = current[filterId] || { filter: undefined, value: undefined };
      return {
        ...current,
        [filterId]: {
          ...state,
          filter: registered,
        },
      };
    });

    return registered;
  }
}
