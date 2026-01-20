/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

export const defaultSummaryAreaCollapsedKey = 'clrSummaryAreaCollapsed';

interface SignalEntry {
  signal: WritableSignal<boolean>;
  storageKey: string;
}

@Injectable({ providedIn: 'root' })
export class ClrSummaryAreaStateService {
  private readonly collapsedMap = new Map<string, SignalEntry>();

  public collapsed(key?: string): Signal<boolean> {
    const storageKey = key || defaultSummaryAreaCollapsedKey;
    return this.getOrCreateEntry(storageKey).signal;
  }

  public toggle(key?: string): void {
    const storageKey = key || defaultSummaryAreaCollapsedKey;
    const entry = this.getOrCreateEntry(storageKey);
    const newValue = !entry.signal();
    entry.signal.set(newValue);
    this.persistToStorage(storageKey, newValue);
  }

  public setCollapsed(key: string, value: boolean): void {
    const entry = this.getOrCreateEntry(key);
    entry.signal.set(value);
    this.persistToStorage(key, value);
  }

  private getOrCreateEntry(storageKey: string): SignalEntry {
    if (!this.collapsedMap.has(storageKey)) {
      const collapsedSignal = signal(this.readInitialState(storageKey));
      this.collapsedMap.set(storageKey, { signal: collapsedSignal, storageKey });
    }
    return this.collapsedMap.get(storageKey)!;
  }

  private persistToStorage(key: string, value: boolean): void {
    try {
      localStorage.setItem(key, String(value));
    } catch (e) {
      // Ignore storage errors
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
