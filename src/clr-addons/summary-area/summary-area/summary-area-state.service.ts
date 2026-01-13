/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClrSummaryAreaStateService {
  public readonly collapsed;
  private readonly storageKey = 'summaryAreaCollapsed';

  constructor() {
    this.collapsed = signal(this.readInitialState());
    effect(() => {
      localStorage.setItem(this.storageKey, String(this.collapsed()));
    });
  }

  public toggle(): void {
    this.collapsed.update(value => !value);
  }

  public setCollapsed(value: boolean): void {
    this.collapsed.set(value);
  }

  private readInitialState(): boolean {
    try {
      return localStorage.getItem(this.storageKey) === 'true';
    } catch {
      return false;
    }
  }
}
