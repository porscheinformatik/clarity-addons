import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ClrDatagrid, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';
import { ClarityIcons, trashIcon } from '@cds/core/icon';

ClarityIcons.addIcons(trashIcon);

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
    if (this.possibleValues?.length) {
      this.filteredValues = values.filter(filtered => this.possibleValues.includes(filtered));
      this.clrFilterValuesChange.emit(this.filteredValues);
    } else {
      this.filteredValues = values;
    }
    this.changes.emit(true);
  }

  @Output() clrFilterValuesChange = new EventEmitter<string[]>();

  possibleValues: string[] = [];
  customPossibleValues = false;
  filteredValues: string[] = [];
  changes = new EventEmitter<boolean>(false);

  destroyed$ = new Subject<void>();

  @Input() set clrPossibleValues(values: string[]) {
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

  setPossibleValues(values: string[]) {
    this.possibleValues = values;
    this.possibleValues.sort();
    this.filteredValues = this.filteredValues.filter(filtered => this.possibleValues.includes(filtered));

    this.emitFilterChanged();
  }

  onChange(selectedValue: string, checkboxState: boolean) {
    if (checkboxState) {
      this.filteredValues.push(selectedValue);
    } else {
      this.filteredValues = this.filteredValues.filter(filteredState => filteredState !== selectedValue);
    }

    this.emitFilterChanged();
  }

  isActive(): boolean {
    return this.filteredValues.length > 0;
  }

  accepts(item: T): boolean {
    return this.filteredValues.includes(item[this.property]);
  }

  public get state(): any {
    return {
      property: this.property,
      value: this.filteredValues,
    };
  }

  clearFilters() {
    this.filteredValues = [];
    this.emitFilterChanged();
  }

  private emitFilterChanged() {
    this.clrFilterValuesChange.emit(this.filteredValues);
    this.changes.emit(true);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
