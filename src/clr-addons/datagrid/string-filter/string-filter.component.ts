import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ClrCommonStringsService, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NestedProperty } from '../util';

export const CLR_STRING_FILTER_DEBOUNCE_MS = 500;

@Component({
  selector: 'clr-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss'],
  standalone: false,
})
export class ClrStringFilterComponent<T extends { [key: string]: any }>
  implements ClrDatagridFilterInterface<T>, OnDestroy, AfterViewInit
{
  @ViewChild('input', { static: false }) private inputRef: ElementRef<HTMLInputElement>;

  private nestedProp: NestedProperty;

  @Input('clrProperty') set property(value: string) {
    this.nestedProp = new NestedProperty(value);
  }

  get property() {
    return this.nestedProp?.prop;
  }

  @Input('clrFilterPlaceholder') placeholder: string;

  get placeholderValue() {
    return this.placeholder || this.commonStrings.keys.filterItems;
  }

  @Input('clrFilterValue')
  public set value(value: string) {
    const normalized = value ?? '';
    this.restartDebounce();
    if (normalized === this._rawValue) {
      return;
    }
    this.inputValue = normalized;
    this.applyValue(normalized, false);
  }

  public get value(): string {
    return this._rawValue;
  }

  @Output('clrFilterValueChange') filterValueChange = new EventEmitter<string>();

  inputValue = '';

  private _rawValue = '';
  private _lowerCaseValue = '';
  private readonly inputChanges = new Subject<string>();
  private readonly _changes = new Subject<string>();
  private debounceSubscription: Subscription;
  private openChangeSubscription: Subscription;
  private isOpen = false;

  constructor(
    private commonStrings: ClrCommonStringsService,
    filterContainer: ClrDatagridFilter
  ) {
    filterContainer.setFilter(this);
    this.restartDebounce();
    this.openChangeSubscription = filterContainer.openChange.subscribe((open: boolean) => {
      this.isOpen = open;
      if (open) {
        this.focusInput();
      }
    });
  }

  ngAfterViewInit() {
    if (this.isOpen) {
      this.focusInput();
    }
  }

  onInput(value: string) {
    this.inputChanges.next(value);
  }

  isActive(): boolean {
    return !!this._rawValue;
  }

  accepts(item: T): boolean {
    const propValue = this.nestedProp ? this.nestedProp.getPropValue(item) : item;
    if (propValue === undefined || propValue === null) {
      return false;
    }
    return String(propValue).toLowerCase().includes(this._lowerCaseValue);
  }

  public get changes(): Observable<string> {
    return this._changes.asObservable();
  }

  public get state(): any {
    return {
      property: this.nestedProp,
      value: this._rawValue,
    };
  }

  public clearFilter() {
    this.inputValue = '';
    this.restartDebounce();
    this.applyValue('');
  }

  public equals(other: ClrDatagridFilterInterface<T, any>): boolean {
    return other === this;
  }

  ngOnDestroy() {
    this.debounceSubscription.unsubscribe();
    this.openChangeSubscription.unsubscribe();
  }

  /**
   * Focuses the filter input. Deferred to a microtask because the popover
   * content (and therefore the input element) isn't rendered yet when the
   * `openChange` event fires or during `ngAfterViewInit`.
   */
  private focusInput() {
    Promise.resolve().then(() => this.inputRef?.nativeElement.focus());
  }

  /**
   * (Re)subscribes to the input debounce pipeline, discarding any pending
   * (not-yet-emitted) debounced keystroke so it can't overwrite a value that
   * was just set programmatically or cleared.
   */
  private restartDebounce() {
    this.debounceSubscription?.unsubscribe();
    this.debounceSubscription = this.inputChanges
      .pipe(debounceTime(CLR_STRING_FILTER_DEBOUNCE_MS), distinctUntilChanged())
      .subscribe(value => this.applyValue(value));
  }

  private applyValue(value: string, emitChange = true) {
    if (value === this._rawValue) {
      return;
    }
    this._rawValue = value;
    this._lowerCaseValue = value.toLowerCase().trim();
    this._changes.next(this._rawValue);
    if (emitChange) {
      this.filterValueChange.emit(this._rawValue);
    }
  }
}
