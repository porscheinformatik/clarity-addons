import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[clrDgField]',
})
export class DatagridFieldDirective {
  @Input()
  clrDgField: string;
}
