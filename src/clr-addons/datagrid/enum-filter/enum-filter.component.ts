import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ClrDatagrid, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';
import { ClarityIcons, trashIcon } from '@cds/core/icon';

ClarityIcons.addIcons(trashIcon);

interface FilterValue {
  value: string;
  displayValue: string;
}

@Component({
  selector: 'clr-enum-filter',
  templateUrl: './enum-filter.component.html',
  styleUrls: ['./enum-filter.component.scss'],
})
export class ClrEnumFilterComponent<T extends { [key: string]: any }>
  implements ClrDatagridFilterInterface<T>, OnDestroy
{
  @Input('clrProperty') property = '';

  @Input('clrFilterValues')
  public set value(values: string[]) {
    if (values === null) {
      values = [];
    }
    if (this.possibleValues?.length) {
      this.filteredValues = this.possibleValues.filter(possibleValue => values?.includes(possibleValue.value));
      this.clrFilterValuesChange.emit(this.getDisplayValues(this.filteredValues));
    } else {
      this.filteredValues = values.map(filtered => ({ value: filtered, displayValue: filtered }));
    }
    this.changes.emit(true);
  }

  @Output() clrFilterValuesChange = new EventEmitter<string[]>();

  possibleValues: FilterValue[] = [];
  customPossibleValues = false;
  filteredValues: FilterValue[] = [];
  changes = new EventEmitter<boolean>(false);

  destroyed$ = new Subject<void>();

  @Input() set clrPossibleValues(values: (string | FilterValue)[]) {
    this.setPossibleValues(values);
    this.customPossibleValues = true;
  }

  constructor(filterContainer: ClrDatagridFilter, datagrid: ClrDatagrid) {
    filterContainer.setFilter(this);
    datagrid.items.allChanges.pipe(takeUntil(this.destroyed$)).subscribe(items => {
      if (!this.customPossibleValues) {
        this.setPossibleValues(
          items.map(item => item[this.property]).filter((value, index, self) => self.indexOf(value) === index)
        );
      }
    });
  }

  setPossibleValues(values: (string | FilterValue)[]) {
    if (values === null) {
      values = [];
    }
    this.possibleValues = values.map(v => (v instanceof Object ? v : { value: v, displayValue: v }));
    this.possibleValues.sort((v1, v2) => v1.displayValue.localeCompare(v2.displayValue));
    this.filteredValues = this.filteredValues.filter(filtered =>
      this.containsFilterValue(this.possibleValues, filtered)
    );

    this.emitFilterChanged();
  }

  onChange(selectedValue: FilterValue, checkboxState: boolean) {
    if (checkboxState) {
      this.filteredValues.push(selectedValue);
    } else {
      this.filteredValues = this.filteredValues.filter(filtered => filtered.value !== selectedValue.value);
    }

    this.emitFilterChanged();
  }

  isActive(): boolean {
    return this.filteredValues.length > 0;
  }

  accepts(item: T): boolean {
    return this.getDisplayValues(this.filteredValues).includes(item[this.property]);
  }

  public get state(): any {
    return {
      property: this.property,
      value: this.getValues(this.filteredValues),
    };
  }

  clearFilters() {
    this.filteredValues = [];
    this.emitFilterChanged();
  }

  private emitFilterChanged() {
    this.clrFilterValuesChange.emit(this.getDisplayValues(this.filteredValues));
    this.changes.emit(true);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected containsFilterValue(entries: FilterValue[], filtered: FilterValue): boolean {
    return entries.some(v => v.value === filtered.value);
  }

  private getDisplayValues(entries: FilterValue[]): string[] {
    return entries.map(entry => entry.displayValue);
  }

  private getValues(entries: FilterValue[]): string[] {
    return entries.map(entry => entry.value);
  }
}
