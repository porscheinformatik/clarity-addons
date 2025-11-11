import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { ClrTreetableFilterInterface, ClrTreetableStringFilterFunction } from '../../interfaces/filter-model';
import { debounceTime, merge, Observable, Subject, take, tap } from 'rxjs';
import { ClrCommonStringsService, ClrPopoverToggleService } from '@clr/angular';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

const DEBOUNCE_TIME = 300 as const;

@Component({
  selector: 'clr-tt-string-filter',
  template: `
    <clr-tt-filter [clrTtFilter]="this">
      <button class="btn btn-sm btn-icon btn-link btn-trash" (click)="clearFilter()">
        <cds-icon shape="trash"></cds-icon>
      </button>
      <clr-input-container>
        <label for="filter">{{ filterLabel() }}</label>
        <input
          #input
          clrInput
          id="filter"
          type="text"
          name="search"
          autocomplete="off"
          [placeholder]="clrTtFilterPlaceholder()"
          [ngModel]="clrTtFilterValue()"
          (ngModelChange)="inputChanged($event)"
        />
      </clr-input-container>
    </clr-tt-filter>
  `,
  styles: `
    .btn-trash {
      position: absolute;
      top: 10px;
      right: 40px;
      padding: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableStringFilter<T> implements ClrTreetableFilterInterface<T, string> {
  private readonly smartToggleService = inject(ClrPopoverToggleService);
  private readonly commonStrings = inject(ClrCommonStringsService);
  private readonly elementRef = inject(ElementRef);

  readonly clrTtStringFilter = input.required<ClrTreetableStringFilterFunction<T>>();
  readonly clrTtFilterPlaceholder = input(this.commonStrings.keys.filterItems);
  readonly clrTtFilterLabel = input('');
  readonly clrTtFilterValue = model<string>();

  private readonly _input = viewChild('input', { read: ElementRef<HTMLInputElement> });
  private readonly _textChange$ = new Subject<string>();

  protected readonly filterLabel = computed(() => {
    const label = this.clrTtFilterLabel();
    if (label) {
      return label;
    }

    const columnElement = this.elementRef.nativeElement?.closest('clr-tt-column');
    const columnTitleElement = columnElement?.querySelector('.treetable-column-title');
    return this.commonStrings.parse(this.commonStrings.keys.datagridFilterLabel, {
      COLUMN: columnTitleElement?.textContent.trim() || '',
    });
  });

  // Only emits the initial value once if it exists
  private readonly initialValue$ = toObservable(this.clrTtFilterValue).pipe(
    take(1),
    filter(value => !!value)
  );

  readonly changes: Observable<string> = merge(this.initialValue$, this._textChange$).pipe(
    debounceTime(DEBOUNCE_TIME),
    tap(input => this.clrTtFilterValue.set(input))
  );

  constructor() {
    this.smartToggleService.openChange.pipe(takeUntilDestroyed()).subscribe(openChange => {
      if (openChange) {
        setTimeout(() => this._input()?.nativeElement.focus());
      }
    });
  }

  accepts(item: T): boolean {
    const filterValue = this.clrTtFilterValue();
    if (!this.isActive() || !filterValue) {
      return true;
    }

    return this.clrTtStringFilter()(item, filterValue.toLowerCase());
  }

  isActive(): boolean {
    const value = this.clrTtFilterValue();
    return !!value && value.length > 0;
  }

  protected clearFilter() {
    this._textChange$.next('');
  }

  protected inputChanged(value: string) {
    this._textChange$.next(value);
  }
}
