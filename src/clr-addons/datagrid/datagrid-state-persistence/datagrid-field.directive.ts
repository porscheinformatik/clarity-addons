import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[clrDgField],[clrDgFieldKey]',
  standalone: false,
})
export class DatagridFieldDirective {
  @Input()
  clrDgField: string;
  @Input()
  clrDgFieldKey: string;

  getFieldName(): string {
    return this.clrDgField ?? this.clrDgFieldKey;
  }
}
