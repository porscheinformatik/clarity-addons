import { Component, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ClrDatagrid, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'clr-enum-filter',
  templateUrl: './enum-filter.component.html',
  styleUrls: ['./enum-filter.component.scss'],
})
export class ClrEnumFilterComponent<T extends { [key: string]: any }>
  implements ClrDatagridFilterInterface<T>, OnDestroy
{
  @Input('clrProperty') property = '';

  possibleValues: string[] = [];
  customPossibleValues = false;
  filteredValues: string[] = [];
  changes = new EventEmitter<boolean>(false);

  destroyed$ = new Subject<void>();

  @Input() set clrPossibleValues(values: string[]) {
    this.possibleValues = values;
    this.customPossibleValues = true;
  }

  constructor(filterContainer: ClrDatagridFilter, datagrid: ClrDatagrid) {
    filterContainer.setFilter(this);
    datagrid.items.allChanges.pipe(takeUntil(this.destroyed$)).subscribe(items => {
      if (!this.customPossibleValues) {
        this.possibleValues = items
          .map(item => item[this.property])
          .filter((value, index, self) => self.indexOf(value) === index);
      }
    });
  }

  onChange(selectedValue: string, checkboxState: boolean) {
    if (checkboxState) {
      this.filteredValues.push(selectedValue);
    } else {
      this.filteredValues = this.filteredValues.filter(filteredState => filteredState !== selectedValue);
    }

    this.changes.emit(true);
  }

  isActive(): boolean {
    return this.filteredValues.length > 0;
  }

  accepts(item: T): boolean {
    return this.filteredValues.includes(item[this.property]);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
