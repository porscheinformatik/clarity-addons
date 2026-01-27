/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Injectable,
  Injector,
  Signal,
  WritableSignal,
  effect,
  inject,
  runInInjectionContext,
  signal,
  untracked,
} from '@angular/core';

export const defaultSummaryAreaCollapsedKey = 'clrSummaryAreaCollapsed';

@Injectable({ providedIn: 'root' })
export class ClrSummaryAreaStateService {
  private readonly collapsedMap = new Map<string, WritableSignal<boolean>>();
  private readonly effectsInitialized = new Set<string>();
  private readonly injector = inject(Injector);

  public collapsed(key?: string): Signal<boolean> {
    const storageKey = key || defaultSummaryAreaCollapsedKey;

    // Use untracked to avoid reactive context issues when getting/creating the signal
    return untracked(() => {
      if (!this.collapsedMap.has(storageKey)) {
        const collapsedSignal = signal(this.readInitialState(storageKey));
        this.collapsedMap.set(storageKey, collapsedSignal);

        // Schedule effect creation outside of any reactive context
        this.scheduleEffectCreation(storageKey, collapsedSignal);
      }
      return this.collapsedMap.get(storageKey)!;
    });
  }

  private scheduleEffectCreation(storageKey: string, collapsedSignal: WritableSignal<boolean>): void {
    if (this.effectsInitialized.has(storageKey)) {
      return;
    }
    this.effectsInitialized.add(storageKey);

    // Use setTimeout to ensure effect is created outside of any reactive context
    setTimeout(() => {
      runInInjectionContext(this.injector, () => {
        effect(() => {
          const value = collapsedSignal();
          try {
            localStorage.setItem(storageKey, String(value));
          } catch (e) {
            // Ignore storage errors
          }
        });
      });
    });
  }

  public toggle(key?: string): void {
    const storageKey = key || defaultSummaryAreaCollapsedKey;
    const collapsedSignal = this.collapsedMap.get(storageKey);
    if (collapsedSignal) {
      collapsedSignal.update(value => !value);
    }
  }

  public setCollapsed(key: string, value: boolean): void {
    const storageKey = key || defaultSummaryAreaCollapsedKey;
    const collapsedSignal = this.collapsedMap.get(storageKey);
    if (collapsedSignal) {
      collapsedSignal.set(value);
    }
  }

  private readInitialState(storageKey: string): boolean {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  }
}
