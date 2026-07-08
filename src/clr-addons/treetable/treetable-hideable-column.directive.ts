/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  computed,
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs/operators';

import { TreetableColumnStateService } from './providers/treetable-column-state.service';
import { ClrTreetableColumn } from './treetable-column';

/**
 * A structural directive meant to be used inside a clr-tt-column component.
 *
 * @example
 * <clr-tt-column>
 *   <ng-container *clrTtHideableColumn="{ hidden: true }">
 *     User ID
 *   </ng-container>
 * </clr-tt-column>
 *
 * It sets up state and properties so that columns can be managed for hide/show
 * by a service and the column manager menu component.
 *
 * The structural directive captures its content as a TemplateRef (without ng-content),
 * which allows it to be safely instantiated in multiple places (header + menu).
 */
@Directive({
  selector: '[clrTtHideableColumn]',
  standalone: false,
})
export class ClrTreetableHideableColumn implements OnInit, OnDestroy {
  private readonly _titleTemplateRef: TemplateRef<any> = inject(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _columnState = inject(TreetableColumnStateService);
  private readonly _column = inject(ClrTreetableColumn);

  clrTtHideableColumn = input<{ hidden: boolean; initial?: boolean } | string>('');
  clrTtHiddenChange = output();

  private readonly resolvedHidden = computed(() => {
    const value = this.clrTtHideableColumn();

    if (typeof value === 'string') {
      return { hidden: false, initialHidden: false };
    }

    const hidden = value?.hidden ?? false;
    return { hidden: hidden, initialHidden: value?.initial ?? hidden };
  });

  constructor() {
    // Render the content in-place (inside the column header)
    this._viewContainerRef.createEmbeddedView(this._titleTemplateRef);

    // React to input changes after initial registration (skip the first emission handled by ngOnInit)
    toObservable(this.resolvedHidden)
      .pipe(skip(1), takeUntilDestroyed())
      .subscribe(value => {
        this._columnState.changeHideable(this._column.columnId, true, value.hidden);
      });
  }

  ngOnInit() {
    // Register the hideable state with the titleTemplateRef that does NOT contain <ng-content>
    const resolvedHidden = this.resolvedHidden();
    this._columnState.registerHideable(this._column.columnId, {
      hideable: true,
      hidden: resolvedHidden.hidden,
      initialHidden: resolvedHidden.initialHidden,
      titleTemplateRef: this._titleTemplateRef,
    });
  }

  ngOnDestroy() {
    // When the directive is destroyed, mark the column as non-hideable
    this._columnState.changeHideable(this._column.columnId, false, false);
  }
}
