import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[clrDgField],[clrDgFieldKey]',
})
export class DatagridFieldDirective {
  @Input()
  clrDgField: string;
  @Input()
  clrDgFieldKey: string;

  get persistenceKey(): string {
    return this.clrDgField ?? this.clrDgFieldKey;
  }
}
