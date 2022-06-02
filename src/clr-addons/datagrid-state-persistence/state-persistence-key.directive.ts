import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[clrStatePersistenceKey]',
})
export class StatePersistenceKeyDirective {
  @Input()
  clrStatePersistenceKey: string;
}
