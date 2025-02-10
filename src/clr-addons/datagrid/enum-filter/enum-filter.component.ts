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
  standalone: false,
})
export class ClrEnumFilterComponent<T extends { [key: string]: any }>
  implements ClrDatagridFilterInterface<T>, OnDestroy
{
  @Input('clrProperty') property = '';

  @Input('clrEmptyValuesTranslation')
  public set setEmptyValuesTranslation(translatedValue: string) {
    if (translatedValue !== this.emptyDefaultValue) {
      this.emptyValue = translatedValue;
      /* update values if translation set */
      this.setFilteredValues(this.filteredValues);
      if (this.possibleValues?.length !== 0) {
        this.setPossibleValues(this.possibleValues);
      }
    }
  }

  @Input('clrFilterValues')
  public set value(values: string[]) {
    this.setFilteredValues(values);
  }

  private setFilteredValues(values: (string | FilterValue)[]): void {
    const mappedValues = this.mapValues(values);
    if (this.possibleValues?.length) {
      const mappedPossibleValues = this.possibleValues.map(v => this.mapValue(v));
      const values = mappedValues.map(v => v.value);
      this.filteredValues = mappedPossibleValues.filter(possibleValue => values?.includes(possibleValue.value));
      this.clrFilterValuesChange.emit(this.getDisplayValues(this.filteredValues));
    } else {
      this.filteredValues = mappedValues;
    }

    this.changes.emit(true);
  }

  @Input() set clrPossibleValues(values: (string | FilterValue)[]) {
    this.setPossibleValues(values);
    this.customPossibleValues = true;
  }

  @Output() clrFilterValuesChange = new EventEmitter<string[]>();

  possibleValues: FilterValue[] = [];
  customPossibleValues = false;
  filteredValues: FilterValue[] = [];
  emptyDefaultValue: string = '(Empty)';
  emptyValue: string = this.emptyDefaultValue;
  changes = new EventEmitter<boolean>(false);

  destroyed$ = new Subject<void>();

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
    this.possibleValues = values.map(value => this.mapValue(value));
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
    const displayValues = this.getDisplayValues(this.filteredValues);
    if (this.acceptEmptyValue(displayValues, item)) {
      return true;
    }
    return displayValues.includes(item[this.property]);
  }

  private acceptEmptyValue(displayValues: string[], item: T): boolean {
    return displayValues.some(value => !value) && !item[this.property];
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
    return entries.map(entry => (!entry.value ? entry.value : entry.displayValue));
  }

  private getValues(entries: FilterValue[]): string[] {
    return entries.map(entry => entry.value);
  }

  private mapValues(values: (string | FilterValue)[]): FilterValue[] {
    if (!values) {
      return [];
    }
    return values.map(value => this.mapValue(value));
  }

  private mapValue(value: string | FilterValue): FilterValue {
    if (value instanceof Object) {
      return !value.value ? { value: '', displayValue: this.emptyValue } : value;
    }

    return value ? { value: value, displayValue: value } : { value: '', displayValue: this.emptyValue };
  }
}
