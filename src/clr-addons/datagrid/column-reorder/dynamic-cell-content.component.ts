import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { DynamicColumn } from './dynamic-column';

@Component({
  selector: 'clr-dg-dynamic-cell-content',
  template: `
    @if (col().component) {
    <ng-container *ngComponentOutlet="col().component; inputs: { item: item() }" />
    } @else if (col().template) {
    <ng-container *ngTemplateOutlet="col().template; context: { $implicit: item() }" />
    } @else if (col().valueFn) {
    {{ col().valueFn(item()) }}
    } @else { - }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, NgTemplateOutlet],
})
export class DynamicCellContentComponent<T> {
  public readonly col = input<DynamicColumn<T>>();
  public readonly item = input<T>();
}
