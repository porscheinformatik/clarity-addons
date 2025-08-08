import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DynamicColumn } from './dynamic-column';

@Component({
  selector: 'clr-dg-dynamic-cell-content',
  template: `
    @if (col().component) {
    <ng-container *ngComponentOutlet="col().component; inputs: { item: item() }" />
    } @else if (col().template) {
    <ng-container *ngTemplateOutlet="col().template; context: { $implicit: item() }" />
    } @else if (col().formatter) {
    {{ col().formatter(item()) }}
    } @else if (col().displayField) {
    {{ item()[col().displayField] }}
    } @else {
    {{ defaultDisplayValue() }}
    }
  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCellContentComponent<T> {
  public readonly col = input<DynamicColumn<T>>();
  public readonly item = input<T>();
  public readonly defaultDisplayValue = input<string>('');
}
