import { Directive } from '@angular/core';

@Directive({
  selector: 'clr-dg-column[clrDgHideableColumn]',
  standalone: false,
})
export class ColumnOrderPersistenceDirective {}
