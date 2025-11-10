import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ClrTreetableTreeNode } from './interfaces/treetable-model';
import { ClrTreetableItemsContext } from './treetable-items';
import { ClrTreetableRecursionService } from './providers/treetable-recursion.service';

@Component({
  selector: 'clr-tt-recursive-rows',
  template: `
    <ng-container>
      @for (child of parent()?.children || children(); track child.id) {
      <ng-container *ngTemplateOutlet="template(); context: getContext(child)" />
      }
    </ng-container>
  `,
  host: {
    '[attr.role]': '"group"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableRecursiveRows<T extends object> {
  private readonly _recursionService = inject(ClrTreetableRecursionService<T>);

  readonly parent = input<ClrTreetableTreeNode<T> | null>(null);
  readonly children = input<ClrTreetableTreeNode<T>[]>([]);

  protected readonly template = computed(() => this._recursionService.recursionTemplate());

  protected getContext(node: ClrTreetableTreeNode<T>): ClrTreetableItemsContext<T> {
    return { $implicit: node.value, isLeaf: node.isLeaf, clrTtNode: node };
  }
}
